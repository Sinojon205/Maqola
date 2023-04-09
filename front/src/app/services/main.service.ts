import {Injectable} from '@angular/core';
import {UIConfig} from "../types/ui-config";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  config: UIConfig = {api: '', locale: 'ru_RU',}

  constructor() {
  }

  init(): Observable<any> {
    return of(null).pipe(tap(() => {
      this.config = (window as any).uiconfig as UIConfig;
    }))
  }

  destroy(): void {
    this.config =  {api: '', locale: 'ru_RU',};
  }
}
