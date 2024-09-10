import { Checklist } from "@/domain/entities/checklist.entity";
import Realm, { BSON } from "realm";

export class OfflineAction extends Realm.Object {
  _id!: BSON.ObjectId;
  type!: "CREATE" | "UPDATE" | "DELETE";
  checklistId?: string;
  data!: Checklist[];
  status!: "PENDING" | "SYNCED";

  static schema = {
    name: "OfflineAction",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      type: "string",
      checklistId: "string?",
      data: "Checklist?",
      status: "string",
    },
  };
}
