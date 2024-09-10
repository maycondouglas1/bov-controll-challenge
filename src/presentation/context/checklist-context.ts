import { Checklist } from "@/domain/entities/checklist.entity";
import { createContext } from "react";

export interface ChecklistContextData {
  checklists: Checklist[];
  syncChecklists: () => void;
}

export const ChecklistContext = createContext<ChecklistContextData>(
  {} as ChecklistContextData
);
