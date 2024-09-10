import { getRealmInstance } from "../realm";

export class DeleteOfflineAction {
  static async delete(id: string): Promise<void> {
    const realm = await getRealmInstance();
    realm.write(() => {
      const offlineAction = realm.objectForPrimaryKey("OfflineAction", id);
      if (offlineAction) {
        realm.delete(offlineAction);
      }
    });
  }
}
