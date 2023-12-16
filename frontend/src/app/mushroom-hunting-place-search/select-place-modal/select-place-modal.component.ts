import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MarkerLatLng} from "../select-place-map/select-place-map.component";
import {Place, PlaceSearchGatewayService} from "../place-search-gateway.service";
import {catchError, finalize, of} from "rxjs";

@Component({
  selector: 'app-select-place-modal',
  templateUrl: './select-place-modal.component.html',
  styleUrls: ['./select-place-modal.component.css']
})
export class SelectPlaceModalComponent {

  loadingPlaceSearch = false;

  distance?: number;
  lanLng?: MarkerLatLng;

  constructor(public dialogRef: MatDialogRef<SelectPlaceModalComponent>,
              private placeSearchGateway: PlaceSearchGatewayService) {
  }

  onPlaceAccepted() {
    this.loadingPlaceSearch = true;

    this.dialogRef.disableClose = true;

    this.placeSearchGateway.searchForPlace({
        distance: this.distance,
        lanLng: this.lanLng
      } as Place
    ).pipe(
      finalize(() => {
        this.loadingPlaceSearch = false;
        this.dialogRef.disableClose = false;
      }),
      catchError(err => {
        this.dialogRef.close({});
        return of(null);
      })).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  onMarkerLatLangChange(event: MarkerLatLng) {
    this.lanLng = event;
  }

  acceptButtonDisabled(): boolean {
    return !this.distance || !this.lanLng;
  }
}
