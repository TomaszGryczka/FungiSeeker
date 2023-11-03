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
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', serviceWorkerConfig),
    AuthModule.forRoot(authConfig),
    MainMenuModule,
    MushroomHuntingModule,

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
