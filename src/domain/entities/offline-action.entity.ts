import { Checklist } from "./checklist.entity";

export type OfflineAction = {
  _id: string;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: Checklist;
  checklistId?: string;
  status: "PENDING" | "SYNCED";
};
