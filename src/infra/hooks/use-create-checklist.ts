import { HttpClient } from "@/data/protocols/http-client";
import { RemoteCreateChecklist } from "@/data/usecases/create-checklist";
import { CreateChecklist } from "@/domain/usecases/create-checklist";
import { useMutation } from "@tanstack/react-query";

export const useCreateChecklist = (httpClient: HttpClient) => {
  const createChecklist = new RemoteCreateChecklist("/checkList", httpClient);

  return useMutation({
    mutationFn: (checklists: CreateChecklist.Params[]) =>
      createChecklist.create(checklists),
  });
};
