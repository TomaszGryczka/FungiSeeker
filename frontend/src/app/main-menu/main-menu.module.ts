import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [MainMenuComponent],
  exports: [
    MainMenuComponent
  ],
  imports: [HttpClientModule],
})
export class MainMenuModule {

}
