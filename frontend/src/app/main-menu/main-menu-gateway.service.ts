import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MainMenuGateway {

  private readonly MAIN_MENU_TITLE_URL = environment.backendApiUrl +  '/api/main-menu';

  constructor(private httpClient: HttpClient) {
  }

  fetchMainMenuTitle(): Observable<string> {
    return this.httpClient.get(this.MAIN_MENU_TITLE_URL, {responseType: 'text'});
  }
}
