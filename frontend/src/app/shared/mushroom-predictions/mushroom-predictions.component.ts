import {Component, Input} from '@angular/core';
import {MushroomPrediction} from "../model/mushroom-prediction";

@Component({
  selector: 'app-mushroom-predictions',
  templateUrl: './mushroom-predictions.component.html',
  styleUrls: ['./mushroom-predictions.component.css']
})
export class MushroomPredictionsComponent {

  @Input()
  mushroomPredictions: MushroomPrediction[] = [];

  constructor() {
  }



}
