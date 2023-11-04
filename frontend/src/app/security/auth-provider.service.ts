import {Injectable, Injector} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService, User} from "@auth0/auth0-angular";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  private readonly auth?: AuthService;

  constructor(private injector: Injector) {
    if (environment.shouldAuthenticate) {
      this.auth = this.injector.get(AuthService);
    }
  }

  user(): Observable<import("@auth0/auth0-spa-js").User | null | undefined> {
    if (environment.shouldAuthenticate && this.auth) {
      return this.auth.user$;
    } else {
      return of({
        name: "Gość"
      } as User);
    }
  }

  getAccessTokenSilently(): Observable<string> {
    if (environment.shouldAuthenticate && this.auth) {
      return this.auth.getAccessTokenSilently();
    } else {
      return of("");
    }
  }
}
