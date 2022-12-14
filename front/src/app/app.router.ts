import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ConfigLoadGuard} from './guard/config-load-guard';
import {AlertComponent} from './components/alert/alert.component';
import {MainViewComponent} from './views/main-view/main-view.component';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AddArticleComponent} from "./components/add-article/add-article.component";
import {HelpViewComponent} from "./views/help-view/help-view.component";
import {MessageComponent} from "./views/message/message.component";
import {NoAuthGuard} from "./guard/no-auth-guard";

const routes: Routes = [
  {path: '', redirectTo: '/main-view', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'help-view', component: HelpViewComponent, canActivate: [ConfigLoadGuard]},
  {path: 'main-view', component: MainViewComponent, canActivate: [ConfigLoadGuard]},
  {path: 'messages', component: MessageComponent, canActivate: [ConfigLoadGuard]},
  {path: 'add-article', component: AddArticleComponent, canActivate: [ConfigLoadGuard]},
  {path: 'alert-popup', component: AlertComponent, canActivate: [ConfigLoadGuard], outlet: 'popup'}
];

export function onRouterError(err: any) {
  console.log(err);
  return false;
}

export const routerConfig: ExtraOptions = {
  useHash: true,
  initialNavigation: 'disabled',
  errorHandler: onRouterError,
  relativeLinkResolution: 'legacy'
};

export const FrogERoutingProviders: any[] = [];
export const FROG_E_ROUTES: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, routerConfig);
