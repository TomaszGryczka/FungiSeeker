import {Mushroom} from "./mushroom";
import {Coordinates} from "./coordinates";
import {MushroomHuntingStatus} from "./mushroom-hunting-status";

export interface MushroomHunting {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  coordinates: Coordinates;
  userId: number;
  stats: MushroomHuntingStatus;
  mushrooms: Mushroom[];
}
