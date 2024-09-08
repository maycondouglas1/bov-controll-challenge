import { HttpClient } from "@/data/protocols/http-client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL,
    });
  }

  async request<T>(params: HttpClient.Params): Promise<AxiosResponse<T>> {
    const { url, body, headers, method } = params;

    try {
      const response = await this.axiosInstance.request<T>({
        url,
        data: body,
        headers,
        method,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
