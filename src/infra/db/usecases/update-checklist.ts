import { Checklist } from "@/domain/entities/checklist.entity";
import { getRealmInstance } from "../realm";

export class UpdateChecklist {
  static async update(checklist: Checklist): Promise<void> {
    const realm = await getRealmInstance();
    realm.write(() => {
      const existingChecklist = realm.objectForPrimaryKey(
        "Checklist",
        checklist._id
      );
      if (existingChecklist) {
        existingChecklist.type = checklist.type;
        existingChecklist.amount_of_milk_produced =
          checklist.amount_of_milk_produced;
        existingChecklist.farmer = checklist.farmer;
        existingChecklist.from = checklist.from;
        existingChecklist.to = checklist.to;
        existingChecklist.number_of_cows_head = checklist.number_of_cows_head;
        existingChecklist.had_supervision = checklist.had_supervision;
        existingChecklist.location = checklist.location;
        existingChecklist.updated_at = new Date();
      }
    });
  }
}
