import {Component} from '@angular/core';
import {MainService} from "./services/main.service";
import {LocaleService} from "./services/locale.service";
import {filter, mergeMap} from "rxjs/operators";
import {interval, Subscription} from "rxjs";
import {LocaleProp} from "./types/locale-prop";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {SignInService} from "./services/sign-in.service";
import {ArticleService} from "./services/article.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  props: LocaleProp | null = {};
  prepared: boolean = false;
  loggedIn = false;
  rout = '/sign-in';
  user = '';
  private sub: Subscription;
  private refreshSub: Subscription | undefined;
  private intervalSub: Subscription | undefined;

  constructor(private service: MainService,
              private locale: LocaleService,
              private article: ArticleService,
              private signService: SignInService,
              private router: Router) {
    this.service = service;
    this.sub = this.service.init().pipe(
      mergeMap(() => this.locale.getLocale())).subscribe(() => {
      this.props = this.locale.props;
      this.prepared = true;

      if (this.signService.refreshToken) {
        this.refreshSub = this.signService.refreshUser().subscribe(() => {
          this.goToRout('main-view');
        }, (err: Error) => {
          console.log(err)
          this.goToRout('sign-in')
        })
      } else {
        this.goToRout('sign-in')
      }
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
    this.refreshToken();
  }


  ngOnDestroy(): void {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
    if (this.refreshSub && !this.refreshSub.closed) {
      this.refreshSub.unsubscribe();
    }
    if (this.intervalSub && !this.intervalSub.closed) {
      this.intervalSub.unsubscribe();
    }
  }

  goToRout(route: string) {
    this.rout = route;
    this.router.navigate([route]).catch((err) => console.log(err));
  }

  onLogOutClick() {
    this.service.destroy()
    this.article.reset()
    this.signService.logout()
    this.goToRout('sign-in');
  }

  private refreshToken(): void {
    this.intervalSub = interval(5000 * 60).pipe(mergeMap(() => this.signService.refreshUser())).subscribe()
  }
}
