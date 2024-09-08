import { HttpClient } from "@/data/protocols/http-client";
import { DeleteChecklist } from "@/domain/usecases/delete-checklist";

export class RemoteDeleteChecklist implements DeleteChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete(params: DeleteChecklist.Params): Promise<void> {
    await this.httpClient.request({
      method: "delete",
      url: `${this.url}/${params.id}`,
    });
  }
}
