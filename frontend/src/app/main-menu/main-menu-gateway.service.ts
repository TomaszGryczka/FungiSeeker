import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {MainMenuData} from "./mian-menu/main-menu.component";

@Injectable({
  providedIn: "root"
})
export class MainMenuGateway {

  private readonly MAIN_MENU_TITLE_URL = environment.backendApiUrl +  "/api/main-menu";

  constructor(private httpClient: HttpClient) {
  }

  fetchMainMenuData(): Observable<MainMenuData> {
    return this.httpClient.get<MainMenuData>(this.MAIN_MENU_TITLE_URL);
  }
}
