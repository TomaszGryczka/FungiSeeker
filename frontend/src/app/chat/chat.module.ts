import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {BaseComponentsModule} from "../shared/base-components.module";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
  ]
})
export class ChatModule { }
