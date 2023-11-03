import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu.component";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {BaseComponentsModule} from "../base-components/base-components.module";

@NgModule({
  declarations: [MainMenuComponent],
  exports: [
    MainMenuComponent
  ],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BaseComponentsModule,
    NgIf,
  ],
})
export class MainMenuModule {

}
