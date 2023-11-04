import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "./main-menu-gateway.service";
import {AuthProviderService} from "../security/auth-provider.service";

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  title = "";
  isLoading = true;

  loadingLastMushroomHunting = true;
  loadedLastMushroomHunting = "";

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
    this.mainMenuGateway.fetchMainMenuTitle().subscribe((hunting) => {
      this.loadedLastMushroomHunting = hunting;
      this.loadingLastMushroomHunting = false;
    });
  }
}
