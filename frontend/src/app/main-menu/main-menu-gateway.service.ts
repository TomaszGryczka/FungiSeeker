import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MainMenuGateway {

  private readonly MAIN_MENU_TITLE_URL = 'http://localhost:8080/api/main-menu';

  constructor(private httpClient: HttpClient) {
  }

  fetchMainMenuTitle(): Observable<string> {
    return this.httpClient.get(this.MAIN_MENU_TITLE_URL, {responseType: 'text'});
  }
}
