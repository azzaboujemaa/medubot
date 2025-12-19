import { Routes } from '@angular/router';

import { PublicLayout } from './layout/public-layout/public-layout'
import { Dashboard } from './dashboard/dashboard';
import { History } from './history/history';
import { Profile } from './profile/profile';
import { FullMapComponent } from './full-map/full-map';
import { DashboardLayout } from './layout/public-layout/dashboard-layout/dashboard-layout';
import { AdminDashboard} from './admin-dashboard/admin-dashboard';
import { AdminLayoutComponent } from './admin-layout/admin-layout';

export const routes: Routes = [

  // Toutes les pages "dashboard" partagent le même layout
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'history', component: History },
       { path: 'profile', component: Profile },
      {path: 'admin-dashboard', component: AdminDashboard },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
     
    ]
  },
   {path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Page d'accueil publique
  { path: 'home', component: PublicLayout },

  // Wildcard
  { path: '**', redirectTo: 'home' }

  
];
