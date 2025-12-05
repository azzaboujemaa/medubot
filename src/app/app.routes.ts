import { Routes } from '@angular/router';

import { PublicLayout } from './public-layout/public-layout';
import { Dashboard } from './dashboard/dashboard';
import { History } from './history/history';
import { Profile } from './profile/profile';
import { FullMapComponent } from './full-map/full-map';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';

export const routes: Routes = [

  // Toutes les pages "dashboard" partagent le même layout
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'history', component: History },
       { path: 'profile', component: Profile },
      { path: 'full-map', component: FullMapComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Page d'accueil publique
  { path: 'home', component: PublicLayout },

  // Wildcard
  { path: '**', redirectTo: 'home' }
];
