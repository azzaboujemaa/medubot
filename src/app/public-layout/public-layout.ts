import { Component } from '@angular/core';
import { Navbars } from '../navbar/navbar';
import { Accueil } from '../accueil/accueil';
import { NotreMission } from '../notre-mission/notre-mission';
import { Environnement } from '../environnement/environnement';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.css'],
  imports: [
    Navbars,
    Accueil,
    NotreMission,
    Environnement
  ]
})
export class PublicLayout {}
