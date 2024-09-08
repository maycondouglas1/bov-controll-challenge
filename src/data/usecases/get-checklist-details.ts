import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { GetChecklistDetails } from "@/domain/usecases/get-checklist-details";

export class RemoteGetChecklistDetails implements GetChecklistDetails {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async getById(params: GetChecklistDetails.Params): Promise<Checklist> {
    return await this.httpClient.request({
      method: "get",
      url: `${this.url}/${params.id}`,
    });
  }
}
