import {Component, Input} from '@angular/core';
import {Mushroom} from "../model/mushroom";
import {MushroomPrediction} from "../model/mushroom-prediction";

@Component({
  selector: 'app-mushrooms-list',
  templateUrl: './mushrooms-list.component.html',
  styleUrls: ['./mushrooms-list.component.css']
})
export class MushroomsListComponent {

  @Input()
  mushrooms?: Mushroom[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  shouldShowMore = false;

  constructor() {
  }

  getMushroomsList(): Mushroom[] {
    return this.mushrooms ? this.mushrooms : [];
  }

  getFirstTwoIfShouldNotShowMore(): Mushroom[] {
    return this.shouldShowMore ?  this.getMushroomsList() : this.getMushroomsList().slice(0, 2);
  }

  toggleShowMore() {
    this.shouldShowMore = !this.shouldShowMore;
  }

  showMoreButtonLabel(): string {
    return this.shouldShowMore ? "Pokaż mniej" : "Pokaż więcej";
  }
}
