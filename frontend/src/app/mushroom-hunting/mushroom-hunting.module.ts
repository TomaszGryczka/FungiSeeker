import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MushroomHuntingComponent} from './mushroom-hunting/mushroom-hunting.component';
import {BaseComponentsModule} from "../base-components/base-components.module";
import { MapComponent } from './map/map.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import { NoneMushroomHuntingComponent } from './none-mushroom-hunting/none-mushroom-hunting.component';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    MushroomHuntingComponent,
    MapComponent,
    NoneMushroomHuntingComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule
  ]
})
export class MushroomHuntingModule {
}
