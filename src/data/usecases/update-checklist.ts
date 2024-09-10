import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { UpdateChecklist } from "@/domain/usecases/update-checklist";
import { CreateOfflineAction } from "@/infra/db/usecases/create-offline-action";
import { UpdateChecklist as UpdateChecklistOffline } from "@/infra/db/usecases/update-checklist";
import NetInfo from "@react-native-community/netinfo";
import { BSON } from "realm";

export class RemoteUpdateChecklist implements UpdateChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update(params: UpdateChecklist.Params): Promise<Checklist> {
    const { data } = params;

    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      const { _id, ...dataWithoutId } = data;
      const result = await this.httpClient.request({
        method: "put",
        url: `${this.url}/${_id}`,
        body: dataWithoutId,
      });

      await UpdateChecklistOffline.update(data as Checklist);
      return result;
    } else {
      await this.createOfflineAction(params);
      return data as Checklist;
    }
  }

  private async createOfflineAction(
    params: UpdateChecklist.Params
  ): Promise<void> {
    const { data } = params;

    await CreateOfflineAction.create({
      _id: new BSON.ObjectId().toHexString(),
      type: "UPDATE",
      data: data as Checklist,
      status: "PENDING",
    });
  }
}
