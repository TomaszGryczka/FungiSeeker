import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MushroomHunting} from "../shared/model/mushrom-hunting";
import {environment} from "../../environments/environment";
import {MushroomPrediction} from "../shared/model/mushroom-prediction";
import {MushroomPredictionDto} from "../shared/model/mushroom-prediction-dto";

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingGatewayService {

  private readonly MUSHROOM_HUNTING_URL = environment.backendApiUrl + "/api/mushroom-hunting";

  constructor(private httpClient: HttpClient) {
  }

  getLastMushroomHunting(): Observable<MushroomHunting> {
    return this.httpClient.get<MushroomHunting>(`${this.MUSHROOM_HUNTING_URL}/active`);
  }

  endMushroomHunting(): Observable<number> {
    return this.httpClient.post<number>(`${this.MUSHROOM_HUNTING_URL}/deactivate`, null);
  }

  addMushroomToHunting(file: File): Observable<MushroomPredictionDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<MushroomPredictionDto>(`${this.MUSHROOM_HUNTING_URL}/addMushroom`, formData);
  }

}
