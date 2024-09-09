import Realm from "realm";
import { schemas } from "./schemas";

export const getRealmInstance = async () => {
  return new Realm({
    path: "bovcontrol-realm",
    schema: schemas,
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
  });
};
