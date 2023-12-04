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

@NgModule({
  declarations: [
    MushroomHuntingPlaceSearchComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    MushroomHuntingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class MushroomHuntingPlaceSearchModule {
}
