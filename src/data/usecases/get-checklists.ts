import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { GetChecklists } from "@/domain/usecases/get-checklists";

export class RemoteGetChecklists implements GetChecklists {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get(): Promise<Checklist[]> {
    return await this.httpClient.request({
      method: "get",
      url: this.url,
    });
  }
}
