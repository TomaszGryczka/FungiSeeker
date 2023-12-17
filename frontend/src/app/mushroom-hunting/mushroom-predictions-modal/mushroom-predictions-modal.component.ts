import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MushroomHuntingPrediction} from "../../shared/model/mushroom-hunting-prediction";
import {
  MushroomHuntingGatewayService,
  MushroomLabel,
  UpdateMushroomInfoData
} from "../mushroom-hunting-gateway.service";
import {Mushroom} from "../../shared/model/mushroom";

@Component({
  selector: 'app-mushroom-predictions-modal',
  templateUrl: './mushroom-predictions-modal.component.html',
  styleUrls: ['./mushroom-predictions-modal.component.css']
})
export class MushroomPredictionsModalComponent implements OnInit {

  isLoading = false;

  allMushrooms: MushroomLabel[] = [];

  selectedPrediction?: MushroomHuntingPrediction;
  description = null;

  constructor(
    public dialogRef: MatDialogRef<MushroomPredictionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MushroomHuntingPrediction,
    private mushroomGateway: MushroomHuntingGatewayService
  ) {
  }

  ngOnInit(): void {
    this.fetchAllMushrooms();
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

  fetchAllMushrooms(): void {
    this.isLoading = true;
    this.mushroomGateway.getAllMushrooms().subscribe(mushrooms => {
      this.allMushrooms = mushrooms;
      this.isLoading = false;
    });
  }
}
