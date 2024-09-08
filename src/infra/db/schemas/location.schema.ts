import Realm from "realm";

export class Location extends Realm.Object {
  latitude!: number;
  longitude!: number;

  static schema: Realm.ObjectSchema = {
    name: "Location",
    embedded: true,
    properties: {
      latitude: "double",
      longitude: "double",
    },
  };
}
