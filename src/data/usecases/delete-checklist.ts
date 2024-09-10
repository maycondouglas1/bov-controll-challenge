import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { DeleteChecklist } from "@/domain/usecases/delete-checklist";
import { CreateOfflineAction } from "@/infra/db/usecases/create-offline-action";
import { DeleteChecklist as DeleteChecklistOffline } from "@/infra/db/usecases/delete-checklist";
import { GetChecklistDetails } from "@/infra/db/usecases/get-checklist-details";
import NetInfo from "@react-native-community/netinfo";
import { BSON } from "realm";

export class RemoteDeleteChecklist implements DeleteChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete(params: DeleteChecklist.Params): Promise<void> {
    const { _id } = params;

    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      await this.httpClient.request({
        method: "delete",
        url: `${this.url}/${_id}`,
      });

      await DeleteChecklistOffline.delete(_id);
    } else {
      await this.createOfflineAction({ _id });
    }
  }

  private async createOfflineAction(
    params: DeleteChecklist.Params
  ): Promise<void> {
    const { _id } = params;
    const checklist = await GetChecklistDetails.get(_id);

    await CreateOfflineAction.create({
      _id: new BSON.ObjectId().toHexString(),
      type: "DELETE",
      data: checklist as Checklist,
      status: "PENDING",
    });
  }
}
