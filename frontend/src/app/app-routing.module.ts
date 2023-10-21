import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {environment} from "../environments/environment";

const authGuard = environment.shouldAuthenticate ? [AuthGuard] : [];

const routes: Routes = [
  {
    path: 'main-menu',
    component: MainMenuComponent,
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
export class AppRoutingModule { }
