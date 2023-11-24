import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-lower-bar',
  templateUrl: './lower-bar.component.html',
  styleUrls: ['./lower-bar.component.css']
})
export class LowerBarComponent {

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(["/main-menu"]).then(() => {});
  }

  navigateToMushroomHunting() {
    this.router.navigate(["/mushroom-hunting"]).then(() => {});
  }

  navigateToAllMushroomHunting() {
    this.router.navigate(["/all-mushroom-hunting"]).then(() => {});
  }
}
