import Realm from "realm";

export class Farmer extends Realm.Object {
  name!: string;
  city!: string;

  static schema: Realm.ObjectSchema = {
    name: "Farmer",
    embedded: true,
    properties: {
      name: "string",
      city: "string",
    },
  };
}
