import { AxiosHttpClient } from "@/infra/http/axios-http-client";
import Home from "@/presentation/screens/home";

export function HomeFactory() {
  const axiosHttpClient = new AxiosHttpClient();

  return <Home httpClient={axiosHttpClient} />;
}
