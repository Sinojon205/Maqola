import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {User} from "../types/user";
import {tap} from "rxjs/operators";
import {ConfigLoadGuard} from "../guard/config-load-guard";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  token: string = ''
  user: User | undefined | null;
  refreshToken: string = '';

  constructor(private http: HttpClient,
              private mainService: MainService,
              private guard: ConfigLoadGuard) {
    this.refreshToken = localStorage.getItem("refresh-token-maqola") || '';
  }

  authenticate(data: any): Observable<any> {
    return this.http.post(this.mainService.config.api + "auth/sign-in", data, {responseType: 'json'}).pipe(map((res: any) => {
      if (!!res.token) {
        this.token = res.token
        this.user = res.user
        this.refreshToken = res.refreshToken;
        localStorage.setItem("refresh-token-maqola", this.refreshToken);
        this.guard.isConfigReady = true;
      }
      return res;
    }))
  }

  register(data: any): Observable<any> {
    return this.http.post(this.mainService.config.api + "auth/sign-up", data, {responseType: 'json'});
  }

  refreshUser(): Observable<any> {
    if (!this.refreshToken) {
      return of(null);
    }
    return this.http.post(this.mainService.config.api + "api/refresh-token", null, {responseType: 'json'}).pipe(
      tap((res: any) => {
        if (!!res.token) {
          this.token = res.token;
          this.guard.isConfigReady = true;
        }
      }));
  }

  logout() {
    this.user = undefined;
    this.token = '';
    this.refreshToken = '';
    localStorage.removeItem('refresh-token-maqola')
    this.guard.isConfigReady = false;
  }
}
