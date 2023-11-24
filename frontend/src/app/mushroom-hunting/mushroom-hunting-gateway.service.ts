import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MushroomHunting} from "../shared/model/mushrom-hunting";
import {environment} from "../../environments/environment";
import {MushroomHuntingPrediction} from "../shared/model/mushroom-hunting-prediction";
import {Mushroom} from "../shared/model/mushroom";
import {MushroomHuntingVisibility} from "../shared/model/mushroom-hunting-visibility";
import {AppUser} from "../shared/user-multi-select/user-gateway.service";

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

  endMushroomHunting(visibility: MushroomHuntingVisibility, sharedTo?: AppUser[]): Observable<number> {
    return this.httpClient.post<number>(`${this.MUSHROOM_HUNTING_URL}/deactivate`, {
      visibility: visibility,
      users: sharedTo?.map(user => user.id) || []
    } as MushroomHuntingEndRequest);
  }

  addMushroomToHunting(file: File): Observable<MushroomHuntingPrediction> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<MushroomHuntingPrediction>(`${this.MUSHROOM_HUNTING_URL}/addMushroom`, formData);
  }

  updateMushroomInfoWithSelectedPrediction(updateInfo: UpdateMushroomInfoData): Observable<Mushroom> {
    return this.httpClient.post<Mushroom>(`${this.MUSHROOM_HUNTING_URL}/updateMushroomInfo`, updateInfo);
  }

}

export interface MushroomHuntingEndRequest {
  visibility: MushroomHuntingVisibility;
  users: number[];
}

export interface UpdateMushroomInfoData {
  description: string | null;
  mushroomPrediction: MushroomHuntingPrediction;
}


