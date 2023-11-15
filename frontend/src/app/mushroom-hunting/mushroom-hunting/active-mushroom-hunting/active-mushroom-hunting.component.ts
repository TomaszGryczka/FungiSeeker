import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MushroomHuntingGatewayService} from "../../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";
import {MushroomHunting} from "../../../shared/model/mushrom-hunting";
import {MushroomPrediction} from "../../../shared/model/mushroom-prediction";
import {MushroomPredictionDto} from "../../../shared/model/mushroom-prediction-dto";

@Component({
  selector: 'app-active-mushroom-hunting',
  templateUrl: './active-mushroom-hunting.component.html',
  styleUrls: ['./active-mushroom-hunting.component.css']
})
export class ActiveMushroomHuntingComponent {

  @Input()
  mushroomHunting?: MushroomHunting;

  mushroomPredictions?: MushroomPredictionDto;

  endingMushroomHunting = false;
  processingMushroomPhoto = false;

  constructor(private router: Router,
              private mushroomHuntingGatewayService: MushroomHuntingGatewayService) {
  }

  endMushroomHunting() {
    this.endingMushroomHunting = true;
    this.mushroomHuntingGatewayService.endMushroomHunting()
      .pipe(finalize(() => this.endingMushroomHunting = false))
      .subscribe((id) => {
        this.router.navigate(["/new-mushroom-hunting/" + id]).then(() => {
        });
      });
  }

  processMushroomPhoto(event: any) {
    this.processingMushroomPhoto = true;
    const file = event.target.files[0];

    if (file) {
      this.mushroomHuntingGatewayService.addMushroomToHunting(file)
        .pipe(finalize(() => this.processingMushroomPhoto = false))
        .subscribe(resp => {
          if (resp) {
            this.mushroomPredictions = resp;
          } else {
            this.mushroomPredictions = undefined;
          }
        });
    }
  }

}
