import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MarkerLatLng} from "./select-place-map/select-place-map.component";
import {Observable} from "rxjs";
import {Coordinates} from "../shared/model/coordinates";

@Injectable({
  providedIn: 'root'
})
export class PlaceSearchGatewayService {

  private readonly PLACE_SEARCH_API_URL = environment.backendApiUrl + "/api/place-search";

  constructor(private httpClient: HttpClient) { }

  searchForPlace(place: Place): Observable<PlaceSearchDTO> {
    const longitude = place.lanLng.longitude;
    const latitude = place.lanLng.latitude;
    return this.httpClient.get<PlaceSearchDTO>(`${this.PLACE_SEARCH_API_URL}/${place.distance}/${longitude}/${latitude}`);
  }
}``

export interface Place {
  distance: number;
  lanLng: MarkerLatLng;
}

export interface PlaceSearchDTO {
  userName: string;
  mushrooms: string;
  googleMapLink: string;
  coordinates: Coordinates;
}
