import {Component, OnInit} from '@angular/core';
import {MushroomHunting} from "../../shared/model/mushrom-hunting";
import {MushroomHuntingGatewayService} from "../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-mushroom-hunting',
  templateUrl: './mushroom-hunting.component.html',
  styleUrls: ['./mushroom-hunting.component.css']
})
export class MushroomHuntingComponent implements OnInit {

  mushroomHunting?: MushroomHunting;
  isLoading = false;
  noneActiveMushroomHuntingFound = false;

  constructor(private mushroomHuntingGatewayService: MushroomHuntingGatewayService) {
  }

  ngOnInit(): void {
    this.fetchLastActiveMushroomHunting();
  }

  private fetchLastActiveMushroomHunting() {
    this.isLoading = true;

    this.mushroomHuntingGatewayService.getLastMushroomHunting()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((mushroomHunting) => {
        if (mushroomHunting) {
          this.mushroomHunting = mushroomHunting;
        } else {
          this.noneActiveMushroomHuntingFound = true;
        }
      });
  }

  shouldShowNoneMushroomHunting() {
    return !this.isLoading && this.noneActiveMushroomHuntingFound;
  }

  shouldShowActiveMushroomHunting() {
    return !this.isLoading && this.mushroomHunting;
  }
}
