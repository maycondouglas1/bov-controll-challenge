import { Checklist } from "@/domain/entities/checklist.entity";
import { CreateChecklist } from "./create-checklist";

export interface UpdateChecklist {
  update(params: UpdateChecklist.Params): Promise<Checklist>;
}

export namespace UpdateChecklist {
  export type Params = {
    id: number;
    data: CreateChecklist.Params;
  };
}
