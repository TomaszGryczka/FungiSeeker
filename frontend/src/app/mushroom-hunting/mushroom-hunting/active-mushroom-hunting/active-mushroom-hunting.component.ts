import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MushroomHuntingGatewayService} from "../../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-active-mushroom-hunting',
  templateUrl: './active-mushroom-hunting.component.html',
  styleUrls: ['./active-mushroom-hunting.component.css']
})
export class ActiveMushroomHuntingComponent {

  endingMushroomHunting = false;

  constructor(private router: Router,
              private mushroomHuntingGatewayService: MushroomHuntingGatewayService) {
  }

  endMushroomHunting() {
    this.endingMushroomHunting = true;
    this.mushroomHuntingGatewayService.endMushroomHunting()
      .pipe(finalize(() => this.endingMushroomHunting = false))
      .subscribe((id) => {
        this.router.navigate(["/new-mushroom-hunting/" + id]).then(() => {});
      });
  }

}
