import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "./main-menu-gateway.service";

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent implements OnInit {
  title = "empty";

  constructor(private mainMenuGateway: MainMenuGateway) {
  }

  ngOnInit(): void {
    this.mainMenuGateway.fetchMainMenuTitle().subscribe(title => this.title = title);
  }
}
