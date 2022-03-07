import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MainService} from "./main.service";
import {UIConfig} from "../types/ui-config";
import {map, mergeMap, tap} from "rxjs/operators";
import {LocaleProp} from "../types/locale-prop";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  props: LocaleProp | null = null;

  constructor(private http: HttpClient, private mainService: MainService) {
  }

  getLocale(): Observable<any> {
    if (!this.mainService.config) {
      this.props = {} as UIConfig
      return of(null);
    }
    const locale = this.mainService.config.locale;
    return of(null).pipe(mergeMap(() => {
      const storProp = localStorage.getItem('mohir-ui-props' + locale)
      if (storProp) {
        return of(storProp);
      } else {
        // @ts-ignore
        return this.http.get<string>(`assets/locale/${locale}/ui.properties`, {responseType: 'text'}).pipe(
          map((res: string | any) => {
            localStorage.setItem('mohir-ui-props' + locale, res)
            return res;
          }));
      }
    }), tap((res: string) => {
      this.props = {};
      res.split("\n")
        .filter((it) => !it.startsWith("#"))
        .forEach((it) => {
          const v = it.split("=");
          // @ts-ignore
          this.props[v[0]] = v[1];
        });
    }));
  }

  destroy() {
    this.props = null;
  }
}
