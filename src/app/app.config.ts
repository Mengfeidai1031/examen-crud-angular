import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      "projectId":"examen-3975b",
      "appId":"1:453073404873:web:415fd777eb1ad9a0625e18",
      "storageBucket":"examen-3975b.firebasestorage.app",
      "apiKey":"AIzaSyDH29s_PQcIf71cphfB1OQjk9ud3El37Ik",
      "authDomain":"examen-3975b.firebaseapp.com",
      "messagingSenderId":"453073404873"})),
    provideFirestore(() => getFirestore())
  ]
};
