import { getRealmInstance } from "../realm";
import { OfflineAction as OfflineActionSchema } from "../schemas/offline-action.schema";

export class GetOfflineActions {
  static async getAll(): Promise<Realm.Results<OfflineActionSchema>> {
    const realmInstance = await getRealmInstance();
    return realmInstance.objects(OfflineActionSchema);
  }
}
