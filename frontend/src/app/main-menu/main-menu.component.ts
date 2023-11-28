import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "./main-menu-gateway.service";
import {AuthProviderService} from "../security/auth-provider.service";
import {Mushroom} from "../shared/model/mushroom";
import {MushroomHunting} from "../shared/model/mushrom-hunting";

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  title = "";
  isLoading = true;

  loadingMainMenuData = true;
  loadedMainMenuData?: MainMenuData;

  constructor(private mainMenuGateway: MainMenuGateway,
              private auth: AuthProviderService) {
  }

  ngOnInit(): void {
    this.initTitle();
    this.loadLastMushroomHunting();
  }

  private initTitle(): void {
    this.auth.user().subscribe((user) => {
      this.title = "Witaj, " + user?.name + "!";
      this.isLoading = false;
    });
  }

  private loadLastMushroomHunting(): void {
    this.mainMenuGateway.fetchMainMenuData().subscribe((data) => {
      this.loadedMainMenuData = data;
      this.loadingMainMenuData = false;
      console.log(this.loadedMainMenuData);
    });
  }
}

export interface MainMenuData {
  mushrooms: Mushroom[];
  mushroomHunting: MushroomHunting[];
}
