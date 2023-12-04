import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {environment} from "../environments/environment";
import {MushroomHuntingComponent} from "./mushroom-hunting/mushroom-hunting/mushroom-hunting.component";
import {NewMushroomHuntingComponent} from "./new-mushroom-hunting/new-mushroom-hunting/new-mushroom-hunting.component";
import {
  MushroomHuntingViewComponent
} from "./mushroom-hunting/mushroom-hunting/active-mushroom-hunting/mushroom-hunting-view.component";
import {
  FinishedMushroomHuntingComponent
} from "./mushroom-hunting-list/finished-mushroom-hunting/finished-mushroom-hunting.component";
import {
  MushroomHuntingListComponent
} from "./mushroom-hunting-list/mushroom-hunting-list/mushroom-hunting-list.component";
import {
  MushroomHuntingPlaceSearchComponent
} from "./mushroom-hunting-place-search/mushroom-hunting-place-search/mushroom-hunting-place-search.component";

const authGuard = environment.shouldAuthenticate ? [AuthGuard] : [];

const routes: Routes = [
  {
    path: 'main-menu',
    component: MainMenuComponent,
    canActivate: authGuard
  },
  {
    path: 'mushroom-hunting',
    component: MushroomHuntingComponent,
    canActivate: authGuard
  },
  {
    path: 'new-mushroom-hunting',
    component: NewMushroomHuntingComponent,
    canActivate: authGuard
  },
  {
    path: 'active-mushroom-hunting',
    component: MushroomHuntingViewComponent,
    canActivate: authGuard
  },
  {
    path: 'finished-mushroom-hunting/:id',
    component: FinishedMushroomHuntingComponent,
    canActivate: authGuard
  },
  {
    path: 'all-mushroom-hunting',
    component: MushroomHuntingListComponent,
    canActivate: authGuard
  },
  {
    path: "mushroom-hunting-place-search",
    component: MushroomHuntingPlaceSearchComponent,
    canActivate: authGuard
  },
  {
    path: '**',
    redirectTo: '/main-menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
