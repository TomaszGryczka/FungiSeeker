import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MushroomPrediction} from "../model/mushroom-prediction";
import {MushroomHuntingPrediction} from "../model/mushroom-hunting-prediction";

@Component({
  selector: 'app-mushroom-predictions',
  templateUrl: './mushroom-predictions.component.html',
  styleUrls: ['./mushroom-predictions.component.css']
})
export class MushroomPredictionsComponent {

  @Input()
  mushroomPrediction?: MushroomHuntingPrediction;

  @Output()
  mushroomSelected = new EventEmitter<MushroomHuntingPrediction>();

  displayedColumns: string[] = ['name', 'weight'];
  selectedRowIndex = -1;

  constructor() {
  }

  mushroomPredictions(): MushroomPrediction[] {
    return this.mushroomPrediction && this.mushroomPrediction.mushroomPredictions
      ? this.mushroomPrediction.mushroomPredictions : [];
  }

  chooseMushroom(selectedPrediction: MushroomPrediction) {
    this.selectedRowIndex = selectedPrediction.mushroomPredictionId;
    this.mushroomSelected.emit({
      mushroomId: this.mushroomPrediction?.mushroomId,
      mushroomPredictions: [selectedPrediction]
    } as MushroomHuntingPrediction);
  }

}
