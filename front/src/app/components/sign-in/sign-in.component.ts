import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {LocaleProp} from "../../types/locale-prop";
import {ConfigLoadGuard} from "../../guard/config-load-guard";
import {HttpErrorResponse} from "@angular/common/http";
import {SignInService} from "../../services/sign-in.service";
import {LocaleService} from "../../services/locale.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    hideRequired: new FormControl()
  });
  showLoadingSpinner = false;
  errMsg = '';
  showError = false;
  props: LocaleProp | null = {};
  logging = false;
  private authSub: Subscription | null | undefined;

  constructor(private router: Router,
              private loginService: SignInService,
              private locale: LocaleService,
              private guard: ConfigLoadGuard,
  ) {
    this.props = locale.props;
    const item = localStorage.getItem('authData')
    if (!item) {
      return
    }
    const loginData = JSON.parse(item);
    if (loginData) {
      // @ts-ignore
      this.loginForm.setValue(loginData);
    }
  }

  ngOnDestroy(): void {
    if (this.authSub && !this.authSub.closed) {
      this.authSub.unsubscribe();
    }
    this.authSub = null;
    this.props = null;
  }

  onLoginClick(evt: MouseEvent) {
    this.logging = true;
    this.showLoadingSpinner = true;
    if (this.authSub && !this.authSub.closed) {
      this.authSub.unsubscribe();
    }
    // @ts-ignore
    this.authSub = this.loginService.authenticate(this.loginForm.value)
      .subscribe((res: any) => {
        this.showLoadingSpinner = false;
        if (res instanceof HttpErrorResponse) {
          console.log(res.error);
          return;
        }
        if (!res.error) {
          this.guard.isConfigReady = true;
          this.router.navigate(['/']).catch((errr) => {
            console.log(errr);
            throw errr;
          });
        } else {
          console.log(res.error);
          this.guard.isConfigReady = false;
        }
        this.logging = false;
      }, (err) => {
        this.errMsg = err.message;
        this.showError = true;
        this.logging = false;
        this.guard.isConfigReady = false;
        this.showLoadingSpinner = false;
        throw err;
      });
  }

  onErrOK(evt: MouseEvent) {
    this.showError = false;
    this.errMsg = '';
  }

  onSignUpClick() {
    this.router.navigate(['sign-up']).catch((errr) => {
      console.log(errr);
      throw errr;
    });
  }
}
