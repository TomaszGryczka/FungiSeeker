import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, mergeMap, Observable, throwError} from "rxjs";
import {AuthProviderService} from "./auth-provider.service";

@Injectable({
  providedIn: "root"
})
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthProviderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}
