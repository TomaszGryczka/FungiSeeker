import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MushroomHuntingListComponent} from './mushroom-hunting-list/mushroom-hunting-list.component';
import {BaseComponentsModule} from "../shared/base-components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    MushroomHuntingListComponent
  ],
    imports: [
        CommonModule,
        BaseComponentsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatCardModule
    ]
})
export class MushroomHuntingListModule {
}
