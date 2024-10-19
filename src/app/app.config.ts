import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({timeOut: 1500, preventDuplicates: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    CookieService,
    importProvidersFrom(HttpClientModule)
  ],
};
