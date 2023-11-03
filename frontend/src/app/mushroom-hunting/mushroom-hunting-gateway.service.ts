import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

const zamockowanaSesjaGrzybobrania: MushroomHunting = {
  id: 1,
  name: "Sesja grzybobrania",
  description: "Zamockowana sesja grzybobrania",
  startDate: "2021-01-01",
  endDate: "2021-01-01",
  durationInHours: 1,
  mushrooms: [
    {
      id: 1,
      name: "Muchomor",
      description: "Muchomor czerwony",
      imageUrl: "https://tvn24.pl/tvnmeteo/najnowsze/cdn-zdjeciec236c0b2cccafaa4cdc45d71fdfd4185-muchomor-czerwony-5233655/alternates/LANDSCAPE_840",
      mushroomHuntingId: 1,
      latitude: 52.013578,
      longitude: 21.927806
    },
    {
      id: 2,
      name: "Kania",
      description: "Czułek kania",
      imageUrl: "https://photos05.redcart.pl/templates/images/description/7700/Image/blog/kania1.jpg",
      mushroomHuntingId: 1,
      latitude: 52.005237,
      longitude: 21.926122
    }
  ]
} as MushroomHunting;

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingGatewayService {

  constructor() {
  }

  getLastMushroomHunting(): Observable<MushroomHunting> {
    return of(zamockowanaSesjaGrzybobrania);
  }
}

export interface MushroomHunting {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  durationInHours: number;
  mushrooms: Mushroom[];
}

export interface Mushroom {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  mushroomHuntingId: number;
  latitude: number;
  longitude: number;
}
