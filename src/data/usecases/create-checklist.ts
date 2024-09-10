import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { CreateChecklist } from "@/domain/usecases/create-checklist";
import { CreateChecklist as CreateChecklistOffline } from "@/infra/db/usecases/create-checklist";
import { CreateOfflineAction } from "@/infra/db/usecases/create-offline-action";
import NetInfo from "@react-native-community/netinfo";
import { BSON } from "realm";

export class RemoteCreateChecklist implements CreateChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async create(params: CreateChecklist.Params[]): Promise<Checklist[]> {
    const checklists = params.map((param) => ({
      ...param,
      location: {
        latitude: param.location?.latitude || 0,
        longitude: param.location?.longitude || 0,
      },
      _id: this.generateId(),
    }));

    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      const result = await this.httpClient.request({
        method: "post",
        url: this.url,
        body: { checklists },
      });

      for (const checklist of checklists) {
        await CreateChecklistOffline.create(checklist);
      }
      return result;
    } else {
      await this.createOfflineActions(checklists);
      return checklists;
    }
  }

  private async createOfflineActions(checklists: Checklist[]): Promise<void> {
    for (const checklist of checklists) {
      await CreateOfflineAction.create({
        _id: new BSON.ObjectId().toHexString(),
        type: "CREATE",
        data: checklist,
        status: "PENDING",
      });
    }
  }

  private generateId(): string {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
}
