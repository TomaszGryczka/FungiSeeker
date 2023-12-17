import {Mushroom} from "./mushroom";
import {Coordinates} from "./coordinates";
import {MushroomHuntingStatus} from "./mushroom-hunting-status";
import {MushroomHuntingVisibility} from "./mushroom-hunting-visibility";

export interface MushroomHunting {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  coordinates: Coordinates;
  userId: number;
  status: MushroomHuntingStatus;
  visibility: MushroomHuntingVisibility;
  mushrooms: Mushroom[];
}
