import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingAppComponent} from "./loading-app/loading-app.component";
import {UpperBarComponent} from "./upper-bar/upper-bar.component";
import {LowerBarComponent} from "./lower-bar/lower-bar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MushroomsListComponent} from './mushrooms-list/mushrooms-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MushroomPredictionsComponent} from './mushroom-predictions/mushroom-predictions.component';
import {ReplaceEmptyDataPipe} from './replace-empty-data-pipe/replace-empty-data.pipe';
import { UserMultiSelectComponent } from './user-multi-select/user-multi-select.component';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoadingAppComponent,
    UpperBarComponent,
    LowerBarComponent,
    MushroomsListComponent,
    MushroomPredictionsComponent,
    ReplaceEmptyDataPipe,
    UserMultiSelectComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingAppComponent,
    UpperBarComponent,
    LowerBarComponent,
    MushroomsListComponent,
    MushroomPredictionsComponent,
    UserMultiSelectComponent,
    ReplaceEmptyDataPipe
  ]
})
export class BaseComponentsModule {
}
