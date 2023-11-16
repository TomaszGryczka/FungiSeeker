import {Injectable} from '@angular/core';
import {Icon, Marker, MarkerOptions} from 'leaflet';
import {MushroomMapStoreService} from "../../shared/mushroom-map-store/mushroom-map-store.service";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private mushroomStore: MushroomMapStoreService) {
  }

  markMushroomsOnMap() {
    this.mushroomStore.getMushrooms().subscribe(mushrooms => {
      const icon = new Icon.Default();
      icon.options.shadowSize = [0, 0];
      this.mushroomStore.getMap().subscribe(mapInstance => {
        if (mapInstance) {
          mushrooms.forEach(mushroom => {
            if (mushroom.latitude && mushroom.longitude) {
              const newMarker = new Marker([mushroom.latitude, mushroom.longitude], {
                icon: icon
              } as MarkerOptions);
              console.log(newMarker)
              newMarker.addTo(mapInstance);
            }
          });
          mapInstance.invalidateSize();
        }
      });
    });
  }
}
