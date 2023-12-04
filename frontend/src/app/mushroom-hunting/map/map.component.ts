import {AfterViewInit, Component} from '@angular/core';
import {FeatureGroup, Map, map, tileLayer} from 'leaflet';
import {MushroomStoreService} from "../../shared/mushroom-map-store/mushroom-store.service";
import {MarkerService} from "./marker.service";
import {MushroomHuntingStoreService} from "../../shared/hunting-map-store/mushroom-hunting-store.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map?: Map;
  private markers?: FeatureGroup;

  constructor(private markerService: MarkerService,
              private mushroomStoreService: MushroomStoreService,
              private mushroomHuntingStoreService: MushroomHuntingStoreService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = map('map', {
      center: [52.009226, 21.922002],
      zoom: 13
    });

    this.markers = new FeatureGroup().addTo(this.map);

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.mushroomStoreService.getMushrooms().subscribe(mushrooms => {
      if (mushrooms) {
        this.markerService.markMushroomsOnMap(mushrooms, this.markers);
        if (this.markers && this.markers.getLayers().length > 0) {
          this.map?.fitBounds(this.markers.getBounds());
        }
      }
    });

    this.mushroomHuntingStoreService.getHunting().subscribe(hunting => {
      if (hunting) {
        this.markerService.markHuntingOnMap(hunting, this.markers);
        if (this.markers && this.markers.getLayers().length > 0) {
          this.map?.fitBounds(this.markers.getBounds());
        }
      }
    });
  }

}
