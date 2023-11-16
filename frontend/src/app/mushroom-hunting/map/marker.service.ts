import {Injectable} from '@angular/core';
import {DivIcon, FeatureGroup, Icon, LayerGroup, Marker, MarkerOptions} from 'leaflet';
import {Mushroom} from "../../shared/model/mushroom";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() {
  }

  markMushroomsOnMap(mushrooms: Mushroom[], markers?: FeatureGroup): void {
    if (markers) {

      mushrooms.forEach(mushroom => {
        if (mushroom.latitude && mushroom.longitude) {
          const newMarker = new Marker([mushroom.latitude, mushroom.longitude], {
            icon: this.circleWithImage(mushroom.imageUrl),
          } as MarkerOptions);
          newMarker.addTo(markers);
        }
      });
    }
  }

  circleWithImage(imageUrl: string): DivIcon {
    return new DivIcon({
      className: 'custom-div-icon',
      html: `<img src="${imageUrl}" alt="image" style="border-radius: 50%; background-size: cover; width: 50px; height: 50px">`
    })
  }
}
