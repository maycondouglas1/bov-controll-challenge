import { HttpClient } from "@/data/protocols/http-client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://challenge-front-end.bovcontrol.com/v1",
    });
  }

  async request(params: HttpClient.Params): Promise<AxiosResponse<any>> {
    const { url, body, headers, method } = params;

    try {
      const response = await this.axiosInstance.request({
        url,
        data: body,
        headers,
        method,
      });

      return response.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
