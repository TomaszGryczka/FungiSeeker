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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  shouldShowMore = false;

  @Output()
  mushroomSelected = new EventEmitter<MushroomHuntingPrediction>();

  constructor() {
  }

  mushroomPredictions(): MushroomPrediction[] {
    return this.mushroomPrediction && this.mushroomPrediction.mushroomPredictions
      ? this.mushroomPrediction.mushroomPredictions : [];
  }

  chooseMushroom(selectedPrediction: MushroomPrediction) {
    this.mushroomSelected.emit({
      mushroomId: this.mushroomPrediction?.mushroomId,
      mushroomPredictions: [selectedPrediction]
    } as MushroomHuntingPrediction);
  }

}
