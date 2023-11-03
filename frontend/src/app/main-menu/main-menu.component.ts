import {Component, OnInit} from "@angular/core";
import {MainMenuGateway} from "./main-menu-gateway.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  title = "empty";
  isLoading = true;

  constructor(private mainMenuGateway: MainMenuGateway,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.mainMenuGateway.fetchMainMenuTitle().subscribe((title) => {
      this.title = title;
      this.isLoading = false;
    });

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        this.authService.getAccessTokenSilently().subscribe((accessToken) => {
          console.log(accessToken);
        });
      } else {
        console.error("User is not authenticated");
      }
    });
  }
}
