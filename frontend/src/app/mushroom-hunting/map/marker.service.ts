import {Injectable} from '@angular/core';
import {DivIcon, FeatureGroup, Marker, MarkerOptions} from 'leaflet';
import {Mushroom} from "../../shared/model/mushroom";
import {StrippedMushroomHunting} from "../../mushroom-hunting-list/mushroom-hunting-list-gateway.service";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() {
  }

  markMushroomsOnMap(mushrooms: Mushroom[], markers?: FeatureGroup): void {
    if (mushrooms && mushrooms.length > 0) {
      markers?.clearLayers();
    }
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

  markHuntingOnMap(hunting: StrippedMushroomHunting[], markers?: FeatureGroup): void {
    if (hunting && hunting.length > 0) {
      markers?.clearLayers();
    }
    if (markers) {
      hunting.forEach(hunting => {
        if (hunting.coordinates && hunting.coordinates.latitude && hunting.coordinates.longitude) {
          const newMarker = new Marker([hunting.coordinates.latitude, hunting.coordinates.longitude], {
            icon: this.circleWithImage(hunting.randomImageUrl),
          } as MarkerOptions);
          newMarker.addTo(markers);
        }
      });
    }
  }

  private circleWithImage(imageUrl: string): DivIcon {
    return new DivIcon({
      className: 'custom-div-icon',
      html: `<img src="${imageUrl}" alt="image" style="border-radius: 50%; background-size: cover; width: 50px; height: 50px">`
    })
  }
}
