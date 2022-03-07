import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SignInService} from "../app/services/sign-in.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private loginService: SignInService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${this.loginService.token}`)
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
