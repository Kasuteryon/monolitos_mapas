import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: BrowserAnimationsModule }, provideFirebaseApp(() => initializeApp({ projectId: "desmontes-mapa", appId: "1:391187962473:web:74e1adc7d81dd6c35420f8", storageBucket: "desmontes-mapa.firebasestorage.app", apiKey: "AIzaSyCwgpEEP15Zr1JyVfdpepi0w6Nc7yDurMc", authDomain: "desmontes-mapa.firebaseapp.com", messagingSenderId: "391187962473", measurementId: "G-JKHM71PXXQ" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService
  ],
});