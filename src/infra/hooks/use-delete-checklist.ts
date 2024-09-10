import { HttpClient } from "@/data/protocols/http-client";
import { RemoteDeleteChecklist } from "@/data/usecases/delete-checklist";
import { useMutation } from "@tanstack/react-query";

export const useDeleteChecklist = (httpClient: HttpClient) => {
  const deleteChecklist = new RemoteDeleteChecklist("/checkList", httpClient);

  return useMutation({
    mutationFn: (checklistId: string) =>
      deleteChecklist.delete({ _id: checklistId }),
  });
};
