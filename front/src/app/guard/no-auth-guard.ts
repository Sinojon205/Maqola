import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthGuard} from "./auth-guard";
import {ConfigLoadGuard} from "./config-load-guard";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authGuard: ConfigLoadGuard
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return of(!this.authGuard.isConfigReady);

  }
}
