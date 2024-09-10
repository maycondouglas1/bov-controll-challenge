import { AxiosHttpClient } from "@/infra/http/axios-http-client";
import { CreateChecklist } from "@/presentation/screens/create-checklist";

export function CreateChecklistFactory() {
  const axiosHttpClient = new AxiosHttpClient();

  return <CreateChecklist httpClient={axiosHttpClient} />;
}
