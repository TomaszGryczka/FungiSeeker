import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "./main-menu-gateway.service";

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  title = "empty";
  isLoading = true;

  constructor(private mainMenuGateway: MainMenuGateway) {
  }

  ngOnInit(): void {
    this.mainMenuGateway.fetchMainMenuTitle().subscribe((title) => {
      this.title = title;
      this.isLoading = false;
    });
  }
}
