import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  PLATFORM_ID,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import {
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { loggerInterceptor } from './core/interceptors/logger.interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import {
  DOCUMENT,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AppInitializerService } from './core/services/app-initializer.service';


export function initializeAppFactory(
  appInitializerService: AppInitializerService
): Function {
  return appInitializerService.initializeApp();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AppInitializerService],
      multi: true,
    },
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    provideClientHydration(
      // withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (req: HttpRequest<unknown>) => true, // to filter
        includeHeaders: [], // to include headers
        includePostRequests: true, // to include POST
      })
    ),
    provideHttpClient(withInterceptors([loggerInterceptor]), withFetch()),
    importProvidersFrom(
      LoggerModule.forRoot({
        serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
      }),
    ),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar', 'hi', 'ml', 'es'],
        defaultLang: 'en',
        // Remove this option if {application}  doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
