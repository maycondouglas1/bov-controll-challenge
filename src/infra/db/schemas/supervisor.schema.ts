import Realm from "realm";

export class Supervisor extends Realm.Object {
  name!: string;

  static schema: Realm.ObjectSchema = {
    name: "Supervisor",
    embedded: true,
    properties: {
      name: "string",
    },
  };
}
