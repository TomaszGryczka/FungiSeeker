import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "@auth0/auth0-angular";
import {SecurityInterceptorService} from "./security/security-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MainMenuModule} from "./main-menu/main-menu.module";
import {MushroomHuntingModule} from "./mushroom-hunting/mushroom-hunting.module";
import {NewMushroomHuntingModule} from "./new-mushroom-hunting/new-mushroom-hunting.module";
import {MushroomHuntingListModule} from "./mushroom-hunting-list/mushroom-hunting-list.module";
import {MushroomHuntingPlaceSearchModule} from "./mushroom-hunting-place-search/mushroom-hunting-place-search.module";
import {ChatModule} from "./chat/chat.module";

const serviceWorkerConfig = {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
};

const authConfig = {
  domain: 'dev-roai3azcgz2xd5bu.eu.auth0.com',
  clientId: 'TAN3vn3OVqkTpvIa8b7TlOrPDsuurhPk',
  authorizationParams: {
    audience: "https://fungi-seeker-backend.azurewebsites.net/",
    redirect_uri: window.location.origin
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule.forRoot(authConfig),
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', serviceWorkerConfig),
    MainMenuModule,
    MushroomHuntingModule,
    NewMushroomHuntingModule,
    MushroomHuntingListModule,
    MushroomHuntingPlaceSearchModule,
    ChatModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
