import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MushroomHunting} from "../shared/model/mushrom-hunting";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingGatewayService {

  private readonly MUSHROOM_HUNTING_URL = environment.backendApiUrl + "/api/mushroom-hunting";

  constructor(private httpClient: HttpClient) {
  }

  getLastMushroomHunting(): Observable<MushroomHunting> {
    return this.httpClient.get<MushroomHunting>(this.MUSHROOM_HUNTING_URL + "/active");
  }
}
