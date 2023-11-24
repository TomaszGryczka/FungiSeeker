import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Coordinates} from "../shared/model/coordinates";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingListGatewayService {

  private readonly MUSHROOM_HUNTING_LIST_URL = environment.backendApiUrl + "/api/mushroom-hunting-list/all";

  constructor(private httpClient: HttpClient) { }

  fetchMushroomHuntingList(): Observable<StrippedMushroomHunting[]> {
    return this.httpClient.get<StrippedMushroomHunting[]>(`${this.MUSHROOM_HUNTING_LIST_URL}`);
  }
}

export interface StrippedMushroomHunting {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
  userId: number;
}
