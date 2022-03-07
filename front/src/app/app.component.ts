import {Component} from '@angular/core';
import {MainService} from "./services/main.service";
import {LocaleService} from "./services/locale.service";
import {filter, mergeMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {LocaleProp} from "./types/locale-prop";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {SignInService} from "./services/sign-in.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sub: Subscription;
  props: LocaleProp | null = {};
  prepared: boolean = false;
  loggedIn = false;
  rout = '';
  user = '';

  constructor(private service: MainService, private locale: LocaleService, private signService: SignInService, private router: Router) {
    this.service = service;
    this.sub = this.service.init().pipe(
      mergeMap(() => this.locale.getLocale())).subscribe(() => {
      this.props = this.locale.props;
      this.prepared = true;
      this.goToRout('main-view')
    });
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd),)
      .subscribe((e: RouterEvent) => {
        if (e.url == '/' && this.signService.token !== '')
          this.goToRout('main-view');
        const p = this.signService.user?.passports[0]
        if (p) {
          this.user = `${p.familia} ${p.name} ${p.nasab}`
        }
      });
  }


  ngOnDestroy(): void {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  goToRout(route: string) {
    this.rout = route;
    this.router.navigate([route]).catch(() => '');
  }

  onLogOutClick() {
    this.signService.user = undefined;
    this.signService.token = '';
    this.goToRout('sign-in');
  }
}
