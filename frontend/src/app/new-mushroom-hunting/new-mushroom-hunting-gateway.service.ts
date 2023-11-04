import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {MushroomHuntingStatus} from "../base-components/model/mushroom-hunting-status";

@Injectable({
  providedIn: 'root'
})
export class NewMushroomHuntingGatewayService {

  private readonly MUSHROOM_HUNTING_CREATION_URL = environment.backendApiUrl + "/api/new-mushroom-hunting/create";

  constructor(private httpClient: HttpClient) { }

  startNewMushroomHunting(name: string, description?: string): Observable<MushroomHuntingCreationResponse> {
    return this.httpClient.post<MushroomHuntingCreationResponse>(this.MUSHROOM_HUNTING_CREATION_URL, {
      name,
      description
    } as MushroomHuntingCreationRequest);
  }
}

export interface MushroomHuntingCreationRequest {
  name: string;
  description?: string;
}

export interface MushroomHuntingCreationResponse {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  status: MushroomHuntingStatus;
}
