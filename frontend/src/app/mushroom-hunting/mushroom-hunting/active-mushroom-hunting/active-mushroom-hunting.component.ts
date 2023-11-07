import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MushroomHuntingGatewayService} from "../../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";
import {MushroomHunting} from "../../../shared/model/mushrom-hunting";

@Component({
  selector: 'app-active-mushroom-hunting',
  templateUrl: './active-mushroom-hunting.component.html',
  styleUrls: ['./active-mushroom-hunting.component.css']
})
export class ActiveMushroomHuntingComponent {

  @Input()
  mushroomHunting?: MushroomHunting;

  endingMushroomHunting = false;
  makingMushroomPhoto = false;

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

  makeMushroomPhoto() {
    this.makingMushroomPhoto = true;
    console.log("makeMushroomPhoto");
    setTimeout(() => {
      this.makingMushroomPhoto = false;
    }, 2000);
  }

}
