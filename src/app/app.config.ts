// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAnalytics((): Analytics => {
      if (typeof window === 'undefined' || !environment.firebase?.measurementId) {
        // Si usas SSR o falta measurementId, evita romper:
        return {} as Analytics;
      }
      return getAnalytics();
    }),

    ScreenTrackingService,
    UserTrackingService
  ]
};