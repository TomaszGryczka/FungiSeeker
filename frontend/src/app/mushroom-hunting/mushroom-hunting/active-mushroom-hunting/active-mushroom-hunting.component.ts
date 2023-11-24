import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MushroomHuntingGatewayService, UpdateMushroomInfoData} from "../../mushroom-hunting-gateway.service";
import {finalize} from "rxjs";
import {MushroomHunting} from "../../../shared/model/mushrom-hunting";
import {MushroomHuntingPrediction} from "../../../shared/model/mushroom-hunting-prediction";
import {MushroomStoreService} from "../../../shared/mushroom-map-store/mushroom-store.service";
import {MatDialog} from "@angular/material/dialog";
import {
  EndMushroomHuntingModalComponent,
  EndMushroomHuntingModalData
} from "../../end-mushroom-hunting-modal/end-mushroom-hunting-modal.component";
import {MushroomHuntingVisibility} from "../../../shared/model/mushroom-hunting-visibility";
import {MushroomPredictionsModalComponent} from "../../mushroom-predictions-modal/mushroom-predictions-modal.component";
import {MushroomPrediction} from "../../../shared/model/mushroom-prediction";

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
              private mushroomStore: MushroomStoreService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.mushroomStore.setMushrooms(this.mushroomHunting?.mushrooms || []);
  }

  openEndMushroomHuntingModal() {
    const dialogRef = this.dialog.open(EndMushroomHuntingModalComponent,
      {
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe((endMushroomHuntingModalData: EndMushroomHuntingModalData) => {
      if (endMushroomHuntingModalData && endMushroomHuntingModalData.visibility) {
        this.endMushroomHunting(endMushroomHuntingModalData);
      }
    });
  }

  openMushroomPredictionsModal(predictions: MushroomHuntingPrediction) {
    const dialogRef = this.dialog.open(MushroomPredictionsModalComponent, {
      data: predictions,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((updateInfo: UpdateMushroomInfoData) => {
      if (updateInfo && updateInfo.mushroomPrediction) {
        this.onMushroomSelected(updateInfo);
      }
    });
  }


  endMushroomHunting(endMushroomHuntingModalData: EndMushroomHuntingModalData) {
    this.endingMushroomHunting = true;
    this.mushroomHuntingGatewayService.endMushroomHunting(
      endMushroomHuntingModalData.visibility, endMushroomHuntingModalData.selectedUsers)
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
            this.openMushroomPredictionsModal(resp);
          } else {
            this.mushroomPredictions = undefined;
          }
        });
    }
  }

  onMushroomSelected(updateInfo: UpdateMushroomInfoData) {
    this.savingMushroomInfo = true;
    this.mushroomHuntingGatewayService.updateMushroomInfoWithSelectedPrediction(updateInfo)
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
