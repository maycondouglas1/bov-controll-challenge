import { Checklist } from "@/domain/entities/checklist.entity";
import { getRealmInstance } from "../realm";

export class CreateChecklist {
  static async create(checklist: Checklist): Promise<Checklist> {
    const realm = await getRealmInstance();
    realm.write(() => {
      realm.create("Checklist", checklist);
    });

    return checklist;
  }
}
