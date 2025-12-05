import { Component } from '@angular/core';
import { Navbars } from '../navbar/navbar';
import { Accueil } from '../accueil/accueil';
import { NotreMission } from '../notre-mission/notre-mission';
import { Environnement } from '../environnement/environnement';
import { Static } from '../static/static';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.css'],
  imports: [
    Navbars,
    Accueil,
    NotreMission,
    Environnement,
    Static,
    Contact,
    Footer
  ]
})
export class PublicLayout {}
