import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HeaderInterceptor} from './httpconfig-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
];
