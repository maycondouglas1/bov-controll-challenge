import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { CreateChecklist } from "@/domain/usecases/create-checklist";

export class RemoteCreateChecklist implements CreateChecklist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async create(params: CreateChecklist.Params): Promise<Checklist> {
    return await this.httpClient.request({
      method: "post",
      url: this.url,
      body: params,
    });
  }
}
