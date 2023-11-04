import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewMushroomHuntingComponent} from "./new-mushroom-hunting/new-mushroom-hunting.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {BaseComponentsModule} from "../shared/base-components.module";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NewMushroomHuntingComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    BaseComponentsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class NewMushroomHuntingModule { }
