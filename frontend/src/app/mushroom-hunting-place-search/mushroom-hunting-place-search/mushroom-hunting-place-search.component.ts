import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PlaceSearchDTO} from "../place-search-gateway.service";

@Component({
  selector: 'app-mushroom-hunting-place-search',
  templateUrl: './mushroom-hunting-place-search.component.html',
  styleUrls: ['./mushroom-hunting-place-search.component.css']
})
export class MushroomHuntingPlaceSearchComponent {

  placeNotFound = false;
  place?: PlaceSearchDTO;

  constructor(private router: Router) {
    this.place = this.router.getCurrentNavigation()?.extras.state as PlaceSearchDTO;
    if (!this.place) {
      this.placeNotFound = true;
    }
  }

  openGoogleMaps() {
    if (this.place && this.place.googleMapLink) {
      window.open(this.place.googleMapLink);
    }
  }
}
