// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics, setAnalyticsCollectionEnabled, logEvent } from 'firebase/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // *** FÁBRICA SÍNCRONA: devuelve SIEMPRE un Analytics real (si hay measurementId) o lanza ***
    provideAnalytics((): Analytics => {
      if (typeof window === 'undefined') {
        // Si usas SSR, comenta completamente provideAnalytics en el servidor.
        throw new Error('Analytics no disponible en SSR');
      }
      if (!environment.firebase?.measurementId) {
        throw new Error('Falta measurementId en environment.firebase');
      }
      const analytics = getAnalytics();
      // Fuerza habilitar la recolección (por si alguna política/flag la desactiva)
      setAnalyticsCollectionEnabled(analytics, true);
      // Dispara un evento de prueba con debug activado
      logEvent(analytics, 'debug_test_event', { debug_mode: true, ts: Date.now() });
      console.info('[GA4] Analytics inicializado.');
      return analytics;
    }),

    ScreenTrackingService,   // page_view automáticos al cambiar de ruta
    UserTrackingService,
  ],
}).catch(err => console.error(err));