import Realm from "realm";

export class Checklist extends Realm.Object<Checklist> {
  _id!: string;
  type!: string;
  amount_of_milk_produced!: number;
  farmer!: {
    name: string;
    city: string;
  };
  from!: {
    name: string;
  };
  to!: {
    name: string;
  };
  number_of_cows_head!: number;
  had_supervision!: boolean;
  location!: {
    latitude: number;
    longitude: number;
  };
  created_at!: string;
  updated_at!: string;

  static schema: Realm.ObjectSchema = {
    name: "Checklist",
    properties: {
      _id: "string",
      type: "string",
      amount_of_milk_produced: "int",
      farmer: {
        type: "object",
        objectType: "Farmer",
      },
      from: {
        type: "object",
        objectType: "Supervisor",
      },
      to: {
        type: "object",
        objectType: "Supervisor",
      },
      number_of_cows_head: "int",
      had_supervision: "bool",
      location: {
        type: "object",
        objectType: "Location",
      },
      created_at: "string",
      updated_at: "string",
    },
    primaryKey: "_id",
  };
}
