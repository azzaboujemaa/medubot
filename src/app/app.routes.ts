import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Profile } from './profile/profile';
import { FullMap } from './full-map/full-map';
import { History } from './history/history';
import { Dashboard } from './dashboard/dashboard';
import { Chat } from './dashboard/chat/chat';
import { DashboardLayout } from './layout/public-layout/dashboard-layout/dashboard-layout';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminLayout} from './admin-layout/admin-layout';
import { EmployeesComponent } from './employees/employees';
import { Partner } from './partner/partner';
import { MeduseDistribution } from './meduse-distribution/meduse-distribution';
import { RobotCard } from './dashboard/robot-card/robot-card';
import { RobotsMap } from './robots-map/robots-map';
import { Messages } from './messages/messages';
import { Path } from 'leaflet';
import { Component } from '@angular/core';
import { Accueil } from './home/accueil/accueil';
import { Contact } from './home/contact/contact';
import { Environnement } from './home/environnement/environnement';
import { NotreMission } from './home/notre-mission/notre-mission';

export const routes: Routes = [

  // 🌍 PUBLIC
  {
  path:'dashboard',
  component: DashboardLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'history', component: History },
      { path: 'profile', component: Profile},
      { path: 'chat', component: Chat }, 
      { path: 'map', component: FullMap },
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
  {
    path:'',
    component: PublicLayout,
    children:[
      {path:'accueil', component: Accueil},
      {path:'contact', component: Contact},
      {path:'environnement', component: Environnement},
      {path:'notre-mission', component: NotreMission}
    ]
  },
     {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
       { path: 'employees', component: EmployeesComponent },
       {path:'partners', component: Partner},
       {path:'meduse-distribution', component: MeduseDistribution},
       {path:'robots-map', component:RobotsMap},
       {path:'messages', component: Messages},
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
     { path: '**', redirectTo: 'dashboard' },
];


  

