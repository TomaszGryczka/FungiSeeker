import {AfterViewInit, Component} from '@angular/core';
import {LayerGroup, Map, map, tileLayer} from 'leaflet';
import {MushroomStoreService} from "../../shared/mushroom-map-store/mushroom-store.service";
import {MarkerService} from "./marker.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map?: Map;
  private markers?: LayerGroup;

  constructor(private markerService: MarkerService,
              private mushroomStoreService: MushroomStoreService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = map('map', {
      center: [52.009226, 21.922002],
      zoom: 13
    });

    this.markers = new LayerGroup().addTo(this.map);

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.mushroomStoreService.getMushrooms().subscribe(mushrooms => {
      if (mushrooms) {
        this.markerService.markMushroomsOnMap(mushrooms, this.markers);
      }
    });
  }

}
