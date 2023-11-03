import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, mergeMap, Observable, throwError} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.shouldAuthenticate) {
      return this.auth.getAccessTokenSilently().pipe(
        mergeMap(token => {
          const tokenReq = req.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          });
          return next.handle(tokenReq);
        }),
        catchError(err => throwError(err))
      );
    } else {
      return next.handle(req);
    }
  }
}
