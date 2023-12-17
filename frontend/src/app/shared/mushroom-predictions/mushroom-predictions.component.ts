import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MushroomPrediction} from "../model/mushroom-prediction";
import {MushroomHuntingPrediction} from "../model/mushroom-hunting-prediction";
import {MushroomLabel} from "../../mushroom-hunting/mushroom-hunting-gateway.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-mushroom-predictions',
  templateUrl: './mushroom-predictions.component.html',
  styleUrls: ['./mushroom-predictions.component.css']
})
export class MushroomPredictionsComponent implements OnInit {

  @Input()
  mushroomPrediction?: MushroomHuntingPrediction;

  @Input()
  allMushrooms: MushroomLabel[] = [];
  options: string[] = [];
  filteredOptions?: Observable<string[]>;

  @Output()
  mushroomSelected = new EventEmitter<MushroomHuntingPrediction>();

  mushroomControl = new FormControl('');

  displayedColumns: string[] = ['name', 'weight'];
  selectedRowIndex = -1;

  constructor() {
  }

  ngOnInit() {
    this.options = this.allMushrooms.map(mushroom => mushroom.name);
    this.filteredOptions = this.mushroomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string | null): string[] {
    const filterValue = value?.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue ? filterValue : ''));
  }

  mushroomPredictions(): MushroomPrediction[] {
    return this.mushroomPrediction && this.mushroomPrediction.mushroomPredictions
      ? this.mushroomPrediction.mushroomPredictions : [];
  }

  chooseMushroom(selectedPrediction: MushroomPrediction) {
    this.mushroomControl.setValue(null);
    this.selectedRowIndex = selectedPrediction.mushroomPredictionId;
    this.mushroomSelected.emit({
      mushroomId: this.mushroomPrediction?.mushroomId,
      mushroomPredictions: [selectedPrediction]
    } as MushroomHuntingPrediction);
  }

  selectedOption(option: string) {
    this.selectedRowIndex = -1;
    this.mushroomControl.setValue(option);
    this.mushroomSelected.emit({
      mushroomId: this.mushroomPrediction?.mushroomId,
      mushroomPredictions: [{
        mushroomPredictionId: this.allMushrooms.find(mushroom => mushroom.name === option)?.id,
        name: option,
        isEdible: this.allMushrooms.find(mushroom => mushroom.name === option)?.isEdible,
        probability: 0,
        imageUrl: ''
      } as MushroomPrediction]
    } as MushroomHuntingPrediction);
  }
}
