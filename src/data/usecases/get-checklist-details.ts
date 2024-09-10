import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { GetChecklistDetails } from "@/domain/usecases/get-checklist-details";
import { GetChecklistDetails as GetChecklistDetailsOffline } from "@/infra/db/usecases/get-checklist-details";
import NetInfo from "@react-native-community/netinfo";

export class RemoteGetChecklistDetails implements GetChecklistDetails {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async getById(params: GetChecklistDetails.Params): Promise<Checklist> {
    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      const result = await this.httpClient.request({
        method: "get",
        url: `${this.url}/${params.id}`,
      });
      return result as Checklist;
    } else {
      return (await GetChecklistDetailsOffline.get(
        String(params.id)
      )) as Checklist;
    }
  }
}
