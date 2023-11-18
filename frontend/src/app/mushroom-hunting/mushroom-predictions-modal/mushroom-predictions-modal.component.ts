import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MushroomHuntingPrediction} from "../../shared/model/mushroom-hunting-prediction";
import {UpdateMushroomInfoData} from "../mushroom-hunting-gateway.service";

@Component({
  selector: 'app-mushroom-predictions-modal',
  templateUrl: './mushroom-predictions-modal.component.html',
  styleUrls: ['./mushroom-predictions-modal.component.css']
})
export class MushroomPredictionsModalComponent {

  selectedPrediction?: MushroomHuntingPrediction;
  description = null;

  constructor(
    public dialogRef: MatDialogRef<MushroomPredictionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MushroomHuntingPrediction,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onMushroomSelected(selectedPrediction: MushroomHuntingPrediction) {
    this.selectedPrediction = selectedPrediction;
  }

  getUpdateInfo(): UpdateMushroomInfoData {
    return {
      description: this.description,
      mushroomPrediction: this.selectedPrediction
    } as UpdateMushroomInfoData;
  }
}
