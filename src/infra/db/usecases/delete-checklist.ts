import { getRealmInstance } from "../realm";

export class DeleteChecklist {
  static async delete(id: string): Promise<void> {
    const realm = await getRealmInstance();
    realm.write(() => {
      const checklist = realm.objectForPrimaryKey("Checklist", id);
      if (checklist) {
        realm.delete(checklist);
      }
    });
  }
}
