import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { UpdateChecklist } from "@/domain/usecases/update-checklist";

export class RemoteUpdateChecklist implements UpdateChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update(params: UpdateChecklist.Params): Promise<Checklist> {
    const { id, data } = params;

    return await this.httpClient.request({
      method: "put",
      url: `${this.url}/${id}`,
      body: data,
    });
  }
}
