import {Component, OnInit} from '@angular/core';
import {MushroomHunting} from "../../shared/model/mushrom-hunting";
import {Router} from "@angular/router";
import {MushroomHuntingListGatewayService} from "../mushroom-hunting-list-gateway.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-finished-mushroom-hunting',
  templateUrl: './finished-mushroom-hunting.component.html',
  styleUrls: ['./finished-mushroom-hunting.component.css']
})
export class FinishedMushroomHuntingComponent implements OnInit {

  mushroomHunting?: MushroomHunting;
  isLoading = false;

  constructor(private mushroomHuntingListGatewayService: MushroomHuntingListGatewayService,
              private router: Router) {
  }

  ngOnInit(): void {
    const mushroomHuntingId = this.router.url.split("/")[2];
    this.mushroomHuntingListGatewayService.fetchMushroomHuntingById(mushroomHuntingId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((mushroomHunting) => {
        if (mushroomHunting) {
          this.mushroomHunting = mushroomHunting;
        }
      });
  }

  shouldShowHunting() {
    return !this.isLoading && this.mushroomHunting;
  }
}
