import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MushroomHuntingPlaceSearchComponent
} from './mushroom-hunting-place-search/mushroom-hunting-place-search.component';
import {BaseComponentsModule} from "../shared/base-components.module";
import {MushroomHuntingModule} from "../mushroom-hunting/mushroom-hunting.module";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SelectPlaceModalComponent } from './select-place-modal/select-place-modal.component';
import { SelectPlaceMapComponent } from './select-place-map/select-place-map.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    MushroomHuntingPlaceSearchComponent,
    SelectPlaceModalComponent,
    SelectPlaceMapComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    MushroomHuntingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class MushroomHuntingPlaceSearchModule {
}
