import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Mushroom} from "../model/mushroom";
import {MushroomPrediction} from "../model/mushroom-prediction";
import {ImageViewerModalComponent} from "../image-viewer-modal/image-viewer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import Viewer from 'viewerjs';

@Component({
  selector: 'app-mushrooms-list',
  templateUrl: './mushrooms-list.component.html',
  styleUrls: ['./mushrooms-list.component.css']
})
export class MushroomsListComponent {

  viewer: any;

  @Input()
  mushrooms?: Mushroom[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @Output()
  selectedMushroomChanged = new EventEmitter<Mushroom>();

  shouldShowMore = false;

  selectedMushroom?: Mushroom;

  constructor(private dialog: MatDialog,) {
  }

  getMushroomsList(): Mushroom[] {
    return this.mushrooms ? this.mushrooms : [];
  }

  getFirstTwoIfShouldNotShowMore(): Mushroom[] {
    return this.shouldShowMore ?  this.getMushroomsList() : this.getMushroomsList().slice(0, 1);
  }

  shouldShowShowMoreButton(): boolean {
    return this.getMushroomsList().length > 1;
  }

  toggleShowMore() {
    this.shouldShowMore = !this.shouldShowMore;
  }

  showMoreButtonLabel(): string {
    return this.shouldShowMore ? "Pokaż mniej" : "Pokaż więcej";
  }

  showMoreButtonIcon(): string {
    return this.shouldShowMore ? "expand_less" : "expand_more";
  }

  openImageViewerModal(imageElemId: string) {
    if (this.viewer) {
      this.viewer.destroy();
    }
    const img = document.getElementById(imageElemId);
    if (img) {
      this.viewer = new Viewer(img, {
        inline: false,
        button: true,
        zoomRatio: 0.3,
      } as Viewer.Options);
      this.viewer.show();
    }
  }

  onMushroomClick(mushroom: Mushroom) {
    if (this.selectedMushroom?.id === mushroom.id) {
      this.selectedMushroom = undefined;
      this.selectedMushroomChanged.emit(undefined);
    } else {
      this.selectedMushroom = mushroom;
      this.selectedMushroomChanged.emit(mushroom);
    }
  }

  rowStyle(mushroom: Mushroom) {
    return {
      "background-color": this.selectedMushroom?.id === mushroom?.id ? "#e0e0e0" : "white"
    }
  }
}
