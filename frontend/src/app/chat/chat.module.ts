import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {BaseComponentsModule} from "../shared/base-components.module";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class ChatModule { }
