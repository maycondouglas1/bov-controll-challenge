import Realm from "realm";
import { Checklist } from "./schemas";

export const getRealmInstance = async () => {
  return await Realm.open({
    schema: [Checklist],
  });
};
