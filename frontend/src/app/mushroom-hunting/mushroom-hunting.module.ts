import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MushroomHuntingComponent} from './mushroom-hunting/mushroom-hunting.component';
import {BaseComponentsModule} from "../base-components/base-components.module";
import { NewMushroomHuntingComponent } from './new-mushroom-hunting/new-mushroom-hunting.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    MushroomHuntingComponent,
    NewMushroomHuntingComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule
  ]
})
export class MushroomHuntingModule {
}
