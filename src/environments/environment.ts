// src/environments/environment.ts
import { FirebaseOptions } from 'firebase/app';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCwgpEEP15Zr1JyVfdpepi0w6Nc7yDurMc',
    authDomain: 'desmontes-mapa.firebaseapp.com',
    projectId: 'desmontes-mapa',
    storageBucket: 'desmontes-mapa.firebasestorage.app',
    messagingSenderId: '391187962473',
    appId: '1:391187962473:web:74e1adc7d81dd6c35420f8',
    measurementId: 'G-JKHM71PXXQ', // requerido para Analytics
  } satisfies FirebaseOptions
};