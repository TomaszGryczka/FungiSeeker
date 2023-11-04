import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {MushroomHuntingStatus} from "../shared/model/mushroom-hunting-status";

@Injectable({
  providedIn: 'root'
})
export class NewMushroomHuntingGatewayService {

  private readonly MUSHROOM_HUNTING_CREATION_URL = environment.backendApiUrl + "/api/new-mushroom-hunting/create";

  constructor(private httpClient: HttpClient) { }

  startNewMushroomHunting(name: string, description?: string): Observable<number> {
    return this.httpClient.post<number>(this.MUSHROOM_HUNTING_CREATION_URL, {
      name,
      description
    } as MushroomHuntingCreationRequest);
  }
}

export interface MushroomHuntingCreationRequest {
  name: string;
  description?: string;
}
