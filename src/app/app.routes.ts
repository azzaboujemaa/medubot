import { Routes } from '@angular/router';

import { PublicLayout } from './public-layout/public-layout';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [

  // 🟦 Page d'accueil = layout public
  { path: '', component: PublicLayout },

  // 🟧 Dashboard robot = page séparée
  { path: 'dashboard', component: Dashboard },

  // 🔄 Redirection si URL inconnue
  { path: '**', redirectTo: '' }
];
