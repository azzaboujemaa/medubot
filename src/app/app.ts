import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Accueil } from "./accueil/accueil";
import { NotreMission } from "./notre-mission/notre-mission";
import { Environnement } from "./environnement/environnement";
import { Navbars } from "./navbar/navbar"; // chemin vers navbar.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Accueil, NotreMission, Environnement, Navbars],  // ✅ clé du problème
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
