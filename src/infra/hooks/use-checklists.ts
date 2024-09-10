import { HttpClient } from "@/data/protocols/http-client";
import { RemoteGetChecklists } from "@/data/usecases/get-checklists";
import { Checklist } from "@/domain/entities/checklist.entity";
import { SyncChecklists } from "@/infra/db/usecases/sync-checklists";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetChecklists } from "../db/usecases/get-checklists";

const fetchChecklists = async (
  httpClient: HttpClient
): Promise<Checklist[] | Realm.Results<Checklist>> => {
  try {
    const remoteGetChecklists = new RemoteGetChecklists(
      "checkList",
      httpClient
    );

    const checklists = await remoteGetChecklists.get();

    const updatedChecklists = checklists.map((checklist) => ({
      ...checklist,
      amount_of_milk_produced: Number(checklist.amount_of_milk_produced),
      number_of_cows_head: Number(checklist.number_of_cows_head),
    }));

    if (updatedChecklists.length > 0) {
      await SyncChecklists.sync(updatedChecklists);
    }

    return updatedChecklists;
  } catch (error) {
    const localChecklists = await GetChecklists.getAll();

    return Array.from(localChecklists).map((checklist) => ({
      ...checklist,
      _id: String(checklist._id),
      amount_of_milk_produced: Number(checklist.amount_of_milk_produced),
    }));
  }
};

export const useChecklists = (
  httpClient: HttpClient
): UseQueryResult<Checklist[] | Realm.Results<Checklist>, Error> => {
  return useQuery<Checklist[] | Realm.Results<Checklist>, Error>({
    queryKey: ["checklists"],
    queryFn: () => fetchChecklists(httpClient),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });
};
