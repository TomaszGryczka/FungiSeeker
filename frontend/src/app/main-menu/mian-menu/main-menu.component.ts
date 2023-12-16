import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "../main-menu-gateway.service";
import {AuthProviderService} from "../../security/auth-provider.service";
import {Mushroom} from "../../shared/model/mushroom";
import {MushroomHunting} from "../../shared/model/mushrom-hunting";
import {MushroomHuntingStatus} from "../../shared/model/mushroom-hunting-status";

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

  getFirstMushroom(): Mushroom {
    return this.loadedMainMenuData?.mushrooms[0] ?? this.emptyMushroom();
  }

  getSecondMushroom(): Mushroom {
    return this.loadedMainMenuData?.mushrooms[1] ?? this.emptyMushroom();
  }

  getFirstMushroomHunting(): MushroomHunting {
    const mushroomHunting = this.loadedMainMenuData?.mushroomHunting[0];
    return mushroomHunting && mushroomHunting.mushrooms.length > 0 ? mushroomHunting : this.emptyMushroomHunting();
  }

  getSecondMushroomHunting(): MushroomHunting {
    const mushroomHunting = this.loadedMainMenuData?.mushroomHunting[1];
    return mushroomHunting && mushroomHunting.mushrooms.length > 0 ? mushroomHunting : this.emptyMushroomHunting();
  }

  private emptyMushroom(): Mushroom {
    return {
      name: "",
      description: "Brak grzybów w ostatnim polowaniu",
      imageUrl: "assets/icons/no_image.png"
    } as Mushroom;
  }

  private emptyMushroomHunting(): MushroomHunting {
    return {
      id: 0,
      name: "",
      description: "Brak ostatniego polowania",
      startDate: "",
      endDate: "",
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      userId: 0,
      status: MushroomHuntingStatus.FINISHED,
      mushrooms: [this.emptyMushroom()]
    } as MushroomHunting;
  }

  private initTitle(): void {
    this.auth.user().subscribe((user) => {
      this.title = "Witaj, " + user?.name + "!";
    });
  }

  private loadLastMushroomHunting(): void {
    this.isLoading = true;
    this.mainMenuGateway.fetchMainMenuData().subscribe((data) => {
      this.loadedMainMenuData = data;
      this.loadingMainMenuData = false;
      this.isLoading = false;
    });
  }
}

export interface MainMenuData {
  mushrooms: Mushroom[];
  mushroomHunting: MushroomHunting[];
}
