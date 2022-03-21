import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {MainViewComponent} from './views/main-view/main-view.component';
import {FROG_E_ROUTES} from "./app.router";
import {AlertComponent} from "./components/alert/alert.component";
import {httpInterceptorProviders} from "../interceptor";
import {ConfigLoadGuard} from "./guard/config-load-guard";
import {MaterialModule} from "./material-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { HelpViewComponent } from './views/help-view/help-view.component';
import { MessageComponent } from './views/message/message.component';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    SignInComponent,
    MainViewComponent,
    SignUpComponent,
    AddArticleComponent,
    FileViewComponent,
    HelpViewComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FROG_E_ROUTES,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ConfigLoadGuard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
