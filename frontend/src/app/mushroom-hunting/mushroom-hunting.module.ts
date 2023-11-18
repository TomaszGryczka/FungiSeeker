import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MushroomHuntingComponent} from './mushroom-hunting/mushroom-hunting.component';
import {BaseComponentsModule} from "../shared/base-components.module";
import { MapComponent } from './map/map.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import { NoneMushroomHuntingComponent } from './mushroom-hunting/none-mushroom-hunting/none-mushroom-hunting.component';
import {MatInputModule} from "@angular/material/input";
import { ActiveMushroomHuntingComponent } from './mushroom-hunting/active-mushroom-hunting/active-mushroom-hunting.component';
import { FinishedMushroomHuntingComponent } from './finished-mushroom-hunting/finished-mushroom-hunting.component';
import { EndMushroomHuntingModalComponent } from './end-mushroom-hunting-modal/end-mushroom-hunting-modal.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { MushroomPredictionsModalComponent } from './mushroom-predictions-modal/mushroom-predictions-modal.component';


@NgModule({
  declarations: [
    MushroomHuntingComponent,
    MapComponent,
    NoneMushroomHuntingComponent,
    ActiveMushroomHuntingComponent,
    FinishedMushroomHuntingComponent,
    EndMushroomHuntingModalComponent,
    MushroomPredictionsModalComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class MushroomHuntingModule {
}
