import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class ConfigLoadGuard implements CanActivate {
  redirectUrl = '';
  isConfigReady: boolean = false;

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isConfigReady) {
      this.redirectUrl = '';
      return true;
    }
    this.redirectUrl = state.url;
    return false;
  }
}
