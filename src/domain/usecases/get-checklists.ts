import { Checklist } from "@/domain/entities/checklist.entity";

export interface GetChecklists {
  get(): Promise<Checklist[]>;
}
