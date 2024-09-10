import { AxiosHttpClient } from "@/infra/http/axios-http-client";
import { ChecklistDetails } from "@/presentation/screens/checklist-details";

export function ChecklistDetailsFactory() {
  const axiosHttpClient = new AxiosHttpClient();

  return <ChecklistDetails httpClient={axiosHttpClient} />;
}
