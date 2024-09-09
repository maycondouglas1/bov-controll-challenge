import { getRealmInstance } from "../realm";
import { Checklist as ChecklistSchema } from "../schemas/checklist.schema";

export class GetChecklists {
  static async getAll(): Promise<Realm.Results<ChecklistSchema>> {
    const realmInstance = await getRealmInstance();
    return realmInstance.objects(ChecklistSchema);
  }
}
