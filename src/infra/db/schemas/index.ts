import { Checklist } from "./checklist.schema";
import { Farmer } from "./farmer.schema";
import { Location } from "./location.schema";
import { OfflineAction } from "./offline-action.schema";
import { Supervisor } from "./supervisor.schema";

const schemas = [Checklist, Farmer, Location, Supervisor, OfflineAction];

export { Checklist, Farmer, Location, OfflineAction, schemas, Supervisor };
