import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MushroomHuntingVisibility} from "../../shared/model/mushroom-hunting-visibility";
import {AppUser} from "../../shared/user/user-gateway.service";

@Component({
  selector: 'app-end-mushroom-hunting-modal',
  templateUrl: './end-mushroom-hunting-modal.component.html',
  styleUrls: ['./end-mushroom-hunting-modal.component.css']
})
export class EndMushroomHuntingModalComponent {

  visibility = MushroomHuntingVisibility.PUBLIC;
  selectedUsers: AppUser[] = [];

  constructor(public dialogRef: MatDialogRef<EndMushroomHuntingModalComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectionChange(users: AppUser[]) {
    this.selectedUsers = users;
  }

  toEndMushroomHuntingModalData(): EndMushroomHuntingModalData {
    return {
      visibility: this.visibility,
      selectedUsers: this.selectedUsers
    };
  }


  protected readonly MushroomHuntingVisibility = MushroomHuntingVisibility;
}

export interface EndMushroomHuntingModalData {
  visibility: MushroomHuntingVisibility;
  selectedUsers: AppUser[];
}
