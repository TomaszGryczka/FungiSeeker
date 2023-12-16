import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FeatureGroup, Icon, Map, map, Marker, tileLayer} from 'leaflet';
import {Coordinates} from "../../shared/model/coordinates";

@Component({
  selector: 'app-select-place-map',
  templateUrl: './select-place-map.component.html',
  styleUrls: ['./select-place-map.component.css']
})
export class SelectPlaceMapComponent implements AfterViewInit {

  private map?: Map;
  private markers?: FeatureGroup;

  @Output()
  marketLatLngChange = new EventEmitter<MarkerLatLng>();

  @Input()
  predefinedCoordinates: Coordinates | undefined;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = map('map', {
      center: [52.009226, 21.922002],
      zoom: 8
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.markers = new FeatureGroup().addTo(this.map);

    if (!this.predefinedCoordinates) {
      this.map.on("click", (event) => {
        if (this.markers) {
          this.markers.clearLayers();

          const icon = new Icon({
            iconUrl: 'assets/icons/marker-resized.png',
            shadowUrl: undefined,
            iconAnchor: [20, 55]
          })

          const newMarker = new Marker(event.latlng, {icon: icon})?.addTo(this.markers);
          this.marketLatLngChange.emit({
            longitude: event.latlng.lng,
            latitude: event.latlng.lat
          } as MarkerLatLng);
        }
      });
    } else {
      const icon = new Icon({
        iconUrl: 'assets/icons/marker-resized.png',
        shadowUrl: undefined,
        iconAnchor: [20, 55]
      })

      const newMarker = new Marker(
        [this.predefinedCoordinates.latitude, this.predefinedCoordinates.longitude], {icon: icon})
        ?.addTo(this.markers);

      this.map.fitBounds(this.markers.getBounds());
    }
  }

}

export interface MarkerLatLng {
  longitude: number;
  latitude: number;
}
