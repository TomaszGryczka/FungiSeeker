import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingAppComponent} from "./loading-app/loading-app.component";
import {UpperBarComponent} from "./upper-bar/upper-bar.component";
import {LowerBarComponent} from "./lower-bar/lower-bar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LoadingAppComponent,
    UpperBarComponent,
    LowerBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    LoadingAppComponent,
    UpperBarComponent,
    LowerBarComponent
  ]
})
export class BaseComponentsModule {
}
