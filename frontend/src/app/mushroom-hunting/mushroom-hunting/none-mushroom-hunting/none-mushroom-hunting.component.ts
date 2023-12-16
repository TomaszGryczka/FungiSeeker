import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  SelectPlaceModalComponent
} from "../../../mushroom-hunting-place-search/select-place-modal/select-place-modal.component";

@Component({
  selector: 'app-none-mushroom-hunting',
  templateUrl: './none-mushroom-hunting.component.html',
  styleUrls: ['./none-mushroom-hunting.component.css']
})
export class NoneMushroomHuntingComponent {

  constructor(private router: Router,
              public dialog: MatDialog,) {
  }

  goToNewMushroomHunting() {
    this.router.navigate(['/new-mushroom-hunting']).then(() => {
    });
  }

  openMushroomHuntingPlaceSearchSelect() {
    const dialogRef = this.dialog.open(SelectPlaceModalComponent,
      {
        width: "90%",
        height: "77%"
      });

    dialogRef.afterClosed()
      .subscribe((data) => {
      this.router.navigate(["/mushroom-hunting-place-search"], {state: data}).then();
    });
  }
}
