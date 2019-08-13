import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";

import { Injectable } from "@angular/core";

import { map, filter, catchError, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth-service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth header from your auth service.
    const authToken = "Bearer" + " " + this.auth.getToken();

    const authReq = req.clone({
      headers: req.headers.set("Authorization", `${authToken}`)
    });

    console.log(authReq);

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.collectFailedRequest(req);
              this.auth.removeToken();
              this.router.navigate(["/login"]);
              // redirect to the login route
              // or show a modal
            } else if (err.status === 403) {
              this.auth.collectFailedRequest(req);
              var usuario = this.auth.getUsuario();
              // if(usuario.tipoUsuario == "Empresa"){
              //   this.router.navigate(['empresa']);
              // }else{
              this.router.navigate(["/"]);
              //  }
            } else if (err.status === 0) {
              //this.router.navigate(['/error']);
              this.router.navigate(["/login"]);
            }
            if (!this.auth.isAuthenticated) {
              this.auth.removeToken();
              this.router.navigate(["/login"]);
            }
          }
        }
      )
    );
  }
}
