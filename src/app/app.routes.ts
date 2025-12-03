import { Routes } from '@angular/router';

import { PublicLayout } from './public-layout/public-layout';
import { Dashboard } from './dashboard/dashboard';
import { FullMapComponent} from './full-map/full-map';

export const routes: Routes = [

  // 🗺️ Full map
  { path: 'full-map', component: FullMapComponent },

  // 🟧 Dashboard robot
  { path: 'dashboard', component: Dashboard },

  // 🏠 Page d'accueil
  { path: '', component: PublicLayout },

  // ❗ wildcards en dernier
  { path: '**', redirectTo: '' }
];
