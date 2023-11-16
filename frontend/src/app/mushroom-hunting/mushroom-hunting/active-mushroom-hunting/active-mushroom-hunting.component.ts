import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MushroomHuntingGatewayService} from "../../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";
import {MushroomHunting} from "../../../shared/model/mushrom-hunting";
import {MushroomHuntingPrediction} from "../../../shared/model/mushroom-hunting-prediction";
import {MushroomMapStoreService} from "../../../shared/mushroom-map-store/mushroom-map-store.service";

@Component({
  selector: 'app-active-mushroom-hunting',
  templateUrl: './active-mushroom-hunting.component.html',
  styleUrls: ['./active-mushroom-hunting.component.css']
})
export class ActiveMushroomHuntingComponent implements OnInit {

  @Input()
  mushroomHunting?: MushroomHunting;

  mushroomPredictions?: MushroomHuntingPrediction;

  endingMushroomHunting = false;
  processingMushroomPhoto = false;
  savingMushroomInfo = false;

  constructor(private router: Router,
              private mushroomHuntingGatewayService: MushroomHuntingGatewayService,
              private mushroomStore: MushroomMapStoreService) {
  }

  ngOnInit(): void {
    this.mushroomStore.setMushrooms(this.mushroomHunting?.mushrooms || []);
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

  onMushroomSelected(prediction: MushroomHuntingPrediction) {
    this.savingMushroomInfo = true;
    this.mushroomHuntingGatewayService.updateMushroomInfoWithSelectedPrediction(prediction)
      .pipe(finalize(() => {
        this.mushroomPredictions = undefined;
        this.savingMushroomInfo = false;
      }))
      .subscribe(resp => {
        this.mushroomHunting?.mushrooms.push(resp);
        this.mushroomStore.setMushrooms(this.mushroomHunting?.mushrooms || []);
      });
  }
}
