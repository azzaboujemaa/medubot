import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

console.log("🔥 main.ts chargé !");   // <-- TEST important

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => {
      console.log("🔥 Firebase initializeApp exécuté !");
      return initializeApp({
        apiKey: "AIzaSyBSUEYv4T9EeaCkcU5ahZzgdKMkYqycQcA",
        authDomain: "medubot-a545f.firebaseapp.com",
        databaseURL: "https://medubot-a545f-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "medubot-a545f",
        storageBucket: "medubot-a545f.appspot.com",
        messagingSenderId: "139359001936",
        appId: "1:139359001936:web:8f272ee3cb9a94cffe2055",
      });
    }),

    provideDatabase(() => getDatabase())
  ]
});
