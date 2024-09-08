export interface HttpClient {
  request: (params: HttpClient.Params) => Promise<any>;
}

export namespace HttpClient {
  export type Params = {
    url: string;
    body?: any;
    headers?: Record<string, string>;
    method: "post" | "get" | "put" | "delete";
  };
}
