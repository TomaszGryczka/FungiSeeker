import {Component, Input} from '@angular/core';
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

  shouldShowMore = false;

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
    const img = document.getElementById(imageElemId);
    if (img) {
      this.viewer = new Viewer(img, {
        inline: false,
        button: true,
        zoomRatio: 0.3,
      } as Viewer.Options);
    }
  }
}
