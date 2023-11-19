import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserGatewayService {

  private readonly USERS_URL = environment.backendApiUrl + "/api/users";

  constructor(private httpClient: HttpClient) { }

  fetchAllUsers(): Observable<AppUser[]> {
    return this.httpClient.get<AppUser[]>(this.USERS_URL);
  }
}

export interface AppUser {
  id: number;
  name: string;
  nickname: string;
}

function instanceOfAppUser(object: any): object is AppUser {
  return 'id' in object && 'name' in object && 'nickname' in object;
}
