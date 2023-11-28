import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Coordinates} from "../shared/model/coordinates";
import {Observable} from "rxjs";
import {MushroomHunting} from "../shared/model/mushrom-hunting";

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingListGatewayService {

  private readonly MUSHROOM_HUNTING_LIST_URL = environment.backendApiUrl + "/api/mushroom-hunting-list/all";
  private readonly MUSHROOM_HUNTING_URL = environment.backendApiUrl + "/api/mushroom-hunting";

  constructor(private httpClient: HttpClient) { }

  fetchMushroomHuntingList(): Observable<StrippedMushroomHunting[]> {
    return this.httpClient.get<StrippedMushroomHunting[]>(`${this.MUSHROOM_HUNTING_LIST_URL}`);
  }

  fetchMushroomHuntingById(id: string): Observable<MushroomHunting> {
    return this.httpClient.get<MushroomHunting>(`${this.MUSHROOM_HUNTING_URL}/${id}`);
  }
}

export interface StrippedMushroomHunting {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
  userId: number;
  randomImageUrl: string;
}
