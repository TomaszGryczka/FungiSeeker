import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MushroomHuntingComponent} from './mushroom-hunting/mushroom-hunting.component';
import {BaseComponentsModule} from "../shared/base-components.module";
import {MapComponent} from './map/map.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {NoneMushroomHuntingComponent} from './mushroom-hunting/none-mushroom-hunting/none-mushroom-hunting.component';
import {MatInputModule} from "@angular/material/input";
import {MushroomHuntingViewComponent} from './mushroom-hunting/active-mushroom-hunting/mushroom-hunting-view.component';
import {
  FinishedMushroomHuntingComponent
} from '../mushroom-hunting-list/finished-mushroom-hunting/finished-mushroom-hunting.component';
import {EndMushroomHuntingModalComponent} from './end-mushroom-hunting-modal/end-mushroom-hunting-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MushroomPredictionsModalComponent} from './mushroom-predictions-modal/mushroom-predictions-modal.component';
import {MatListModule} from "@angular/material/list";
import { MushroomHuntingStatisticsModalComponent } from './mushroom-hunting-statistics-modal/mushroom-hunting-statistics-modal.component';


@NgModule({
  declarations: [
    MushroomHuntingComponent,
    MapComponent,
    NoneMushroomHuntingComponent,
    MushroomHuntingViewComponent,
    FinishedMushroomHuntingComponent,
    EndMushroomHuntingModalComponent,
    MushroomPredictionsModalComponent,
    MushroomHuntingStatisticsModalComponent
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
    ReactiveFormsModule,
    MatListModule
  ],
  exports: [
    MapComponent
  ],
  providers: []
})
export class MushroomHuntingModule {
}
