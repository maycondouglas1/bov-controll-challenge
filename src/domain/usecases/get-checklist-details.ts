import { Checklist } from "@/domain/entities/checklist.entity";

export interface GetChecklistDetails {
  getById(params: GetChecklistDetails.Params): Promise<Checklist>;
}

export namespace GetChecklistDetails {
  export type Params = {
    id: number;
  };
}
