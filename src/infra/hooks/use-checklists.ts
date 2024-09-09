import { HttpClient } from "@/data/protocols/http-client";
import { Checklist } from "@/domain/entities/checklist.entity";
import { SyncChecklists } from "@/infra/db/usecases/sync-checklists";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetChecklists } from "../db/usecases/get-checklists";

const fetchChecklists = async (
  httpClient: HttpClient
): Promise<Checklist[] | Realm.Results<Checklist>> => {
  try {
    const remoteChecklists = await httpClient.request({
      method: "get",
      url: "/checkList",
    });

    await SyncChecklists.sync(remoteChecklists);
    return remoteChecklists;
  } catch (error) {
    console.log("Erro ao buscar dados remotos, usando dados locais", error);
    return Array.from(await GetChecklists.getAll());
  }
};

export const useChecklists = (
  httpClient: HttpClient
): UseQueryResult<Checklist[] | Realm.Results<Checklist>, Error> => {
  return useQuery<Checklist[] | Realm.Results<Checklist>, Error>({
    queryKey: ["checklists"],
    queryFn: () => fetchChecklists(httpClient),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
