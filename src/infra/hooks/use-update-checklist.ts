import { HttpClient } from "@/data/protocols/http-client";
import { RemoteUpdateChecklist } from "@/data/usecases/update-checklist";
import { UpdateChecklist } from "@/domain/usecases/update-checklist";
import { useMutation } from "@tanstack/react-query";

export const useUpdateChecklist = (httpClient: HttpClient) => {
  const updateChecklist = new RemoteUpdateChecklist("/checkList", httpClient);

  return useMutation({
    mutationFn: (checklist: UpdateChecklist.Params) =>
      updateChecklist.update(checklist),
  });
};
