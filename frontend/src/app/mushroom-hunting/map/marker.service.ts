import {Injectable} from '@angular/core';
import {Icon, LayerGroup, Marker, MarkerOptions} from 'leaflet';
import {Mushroom} from "../../shared/model/mushroom";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() {
  }

  markMushroomsOnMap(mushrooms: Mushroom[], markers?: LayerGroup): void {
    if (markers) {
      const icon = new Icon.Default();
      icon.options.shadowSize = [0, 0];

      mushrooms.forEach(mushroom => {
        if (mushroom.latitude && mushroom.longitude) {
          const newMarker = new Marker([mushroom.latitude, mushroom.longitude], {
            icon: icon
          } as MarkerOptions);
          newMarker.addTo(markers);
        }
      });
    }
  }
}
