import { Checklist } from "@/domain/entities/checklist.entity";
import { getRealmInstance } from "../realm";

export class SyncChecklists {
  static async sync(checklists: Checklist[]) {
    const realmInstance = await getRealmInstance();

    realmInstance.write(() => {
      checklists.forEach((checklist: Checklist) => {
        const safeChecklist = {
          ...checklist,
          _id: String(checklist._id),
        };

        realmInstance.create("Checklist", safeChecklist, true);
      });
    });
  }
}
