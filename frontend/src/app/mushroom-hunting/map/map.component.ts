import {AfterViewInit, Component} from '@angular/core';
import {map, tileLayer, Map} from 'leaflet';
import {MushroomMapStoreService} from "../../shared/mushroom-map-store/mushroom-map-store.service";
import {MarkerService} from "./marker.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map?: Map;

  constructor(private markerService: MarkerService,
              private mushroomMapStoreService: MushroomMapStoreService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.mushroomMapStoreService.setMap(map('map', {
      center: [52.009226, 21.922002],
      zoom: 13
    }));

    this.mushroomMapStoreService.getMap().subscribe(map => {
      if (map) {
        this.map = map;
        const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);

      } else {
        console.error("Map is not initialized");
      }
    });

    this.markerService.markMushroomsOnMap();
  }

}
