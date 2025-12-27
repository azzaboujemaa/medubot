import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Profile } from './profile/profile';
import { FullMap } from './full-map/full-map';
import { History } from './history/history';
import { Dashboard } from './dashboard/dashboard';
import { DashboardLayout } from './layout/public-layout/dashboard-layout/dashboard-layout';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminLayout} from './admin-layout/admin-layout';
import { EmployeesComponent } from './employees/employees';

export const routes: Routes = [

  // 🌍 PUBLIC
  {
  path:'',
  component: DashboardLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'history', component: History },
      { path: 'profile', component: Profile},
      { path: 'map', component: FullMap },
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
   {path:'home', component:PublicLayout},
     {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
       { path: 'employees', component: EmployeesComponent }
    ]
  },
     { path: '**', redirectTo: 'dashboard' },
];


  

