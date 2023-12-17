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
import {MushroomPredictionsModalComponent} from "../../mushroom-predictions-modal/mushroom-predictions-modal.component";
import {AuthService} from "@auth0/auth0-angular";
import {UserGatewayService} from "../../../shared/user/user-gateway.service";
import {MushroomHuntingStatus} from "../../../shared/model/mushroom-hunting-status";
import {
  MushroomHuntingStatisticsModalComponent
} from "../../mushroom-hunting-statistics-modal/mushroom-hunting-statistics-modal.component";
import {Mushroom} from "../../../shared/model/mushroom";

@Component({
  selector: 'app-mushroom-hunting-view',
  templateUrl: './mushroom-hunting-view.component.html',
  styleUrls: ['./mushroom-hunting-view.component.css']
})
export class MushroomHuntingViewComponent implements OnInit {

  @Input()
  mushroomHunting?: MushroomHunting;

  mushroomPredictions?: MushroomHuntingPrediction;

  endingMushroomHunting = false;
  processingMushroomPhoto = false;
  savingMushroomInfo = false;

  hasAccess = false;
  isEnded = false;

  selectedMushroom?: Mushroom;
  deletingMushroom = false;

  constructor(private router: Router,
              private mushroomHuntingGatewayService: MushroomHuntingGatewayService,
              private mushroomStore: MushroomStoreService,
              public dialog: MatDialog,
              private auth: AuthService,
              private userGatewayService: UserGatewayService) {
  }

  ngOnInit(): void {
    this.mushroomStore.setMushrooms(this.mushroomHunting?.mushrooms || []);
    this.checkHasAccess();
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

  openStatisticsModal() {
    const dialogRef = this.dialog.open(MushroomHuntingStatisticsModalComponent,
      {
        autoFocus: false,
        data: this.mushroomHunting,
        width: "80%",
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

  checkHasAccess(): void {
    const mushroomHuntingStatus = this.mushroomHunting?.status;
    const mushroomHuntingOwner = this.mushroomHunting?.userId;

    this.userGatewayService.getMe().subscribe(me => {
        if (me) {
          this.hasAccess = mushroomHuntingOwner === me.id;
          this.isEnded = mushroomHuntingStatus !== MushroomHuntingStatus.ACTIVE;
        } else {
          this.hasAccess = false;
          this.isEnded = true;
        }
      }
    );
  }

  navigateToChat(): void {
    this.router.navigate(["/chat", this.mushroomHunting?.id]).then(() => {
    });
  }

  onSelectedMushroomChange(mushroom: Mushroom) {
    this.selectedMushroom = mushroom;
  }

  deleteMushroom() {
    this.deletingMushroom = true;
    if (this.selectedMushroom) {
      this.mushroomHuntingGatewayService.deleteMushroom(this.selectedMushroom?.id).subscribe(() => {
        this.deletingMushroom = false;
        if (this.mushroomHunting && this.mushroomHunting.mushrooms) {
          this.mushroomHunting.mushrooms = this.mushroomHunting?.mushrooms.filter(mushroom => mushroom.id !== this.selectedMushroom?.id);
          this.mushroomStore.setMushrooms(this.mushroomHunting?.mushrooms || []);
        }
      });
    }
  }
}
