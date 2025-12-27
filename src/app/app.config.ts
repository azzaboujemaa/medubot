import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // 🔥 Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),          // ✅ OBLIGATOIRE
    provideFirestore(() => getFirestore()), // ✅ OBLIGATOIRE
    provideDatabase(() => getDatabase()),
  ]
};
