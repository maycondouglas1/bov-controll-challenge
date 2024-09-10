import { HttpClient } from "@/data/protocols/http-client";
import { RemoteGetChecklistDetails } from "@/data/usecases/get-checklist-details";
import { Checklist } from "@/domain/entities/checklist.entity";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetChecklistDetails } from "../db/usecases/get-checklist-details";

const fetchChecklistDetails = async (
  httpClient: HttpClient,
  checklistId: string
): Promise<Checklist> => {
  const getChecklistDetails = new RemoteGetChecklistDetails(
    "checkList",
    httpClient
  );

  try {
    return await getChecklistDetails.getById({ id: Number(checklistId) });
  } catch (error) {
    return (await GetChecklistDetails.get(checklistId)) as Checklist;
  }
};

export const useChecklistDetails = (
  httpClient: HttpClient,
  checklistId: string
): UseQueryResult<Checklist, Error> => {
  return useQuery<Checklist, Error>({
    queryKey: ["checklistDetails", checklistId],
    queryFn: () => fetchChecklistDetails(httpClient, checklistId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
