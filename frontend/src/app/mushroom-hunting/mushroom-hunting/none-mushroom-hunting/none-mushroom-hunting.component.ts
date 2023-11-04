import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-none-mushroom-hunting',
  templateUrl: './none-mushroom-hunting.component.html',
  styleUrls: ['./none-mushroom-hunting.component.css']
})
export class NoneMushroomHuntingComponent {

  constructor(private router: Router) {
  }

  goToNewMushroomHunting() {
    this.router.navigate(['/new-mushroom-hunting']).then(() => {});
  }
}
