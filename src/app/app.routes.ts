import { Routes } from '@angular/router';

import { Accueil } from './accueil/accueil';
import { Navbars } from './navbar/navbar';
import { NotreMission } from './notre-mission/notre-mission';
import { Environnement } from './environnement/environnement';


export const routes: Routes = [
    {path:'navbar',component:Navbars},
    {path:'accueil',component:Accueil},
    {path:'notre-mission',component:NotreMission},
    {path:'environment', component: Environnement}

];
