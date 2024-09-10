import { Checklist } from "@/domain/entities/checklist.entity";
import { getRealmInstance } from "../realm";
import { Checklist as ChecklistSchema } from "../schemas/checklist.schema";

export class GetChecklistDetails {
  static async get(checklistId: string): Promise<Checklist | null> {
    const realmInstance = await getRealmInstance();
    const result = realmInstance.objectForPrimaryKey(
      ChecklistSchema,
      checklistId
    );
    return result ? (result as Checklist) : null;
  }
}
