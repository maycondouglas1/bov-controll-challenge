import { OfflineAction } from "@/domain/entities/offline-action.entity";
import { getRealmInstance } from "../realm";

export class CreateOfflineAction {
  static async create(offlineAction: OfflineAction): Promise<OfflineAction> {
    const realm = await getRealmInstance();
    realm.write(() => {
      realm.create("OfflineAction", offlineAction);
    });

    return offlineAction;
  }
}
