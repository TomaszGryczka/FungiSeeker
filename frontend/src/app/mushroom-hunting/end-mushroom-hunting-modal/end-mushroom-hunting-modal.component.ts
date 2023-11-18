import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MushroomHuntingVisibility} from "../../shared/model/mushroom-hunting-visibility";

@Component({
  selector: 'app-end-mushroom-hunting-modal',
  templateUrl: './end-mushroom-hunting-modal.component.html',
  styleUrls: ['./end-mushroom-hunting-modal.component.css']
})
export class EndMushroomHuntingModalComponent {

  visibility = MushroomHuntingVisibility.PUBLIC;

  constructor(public dialogRef: MatDialogRef<EndMushroomHuntingModalComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  protected readonly MushroomHuntingVisibility = MushroomHuntingVisibility;
}
