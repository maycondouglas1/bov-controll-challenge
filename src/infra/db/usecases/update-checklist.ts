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
        realm.delete(existingChecklist);
      }
      realm.create("Checklist", checklist);
    });
  }
}
