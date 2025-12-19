import { Component } from '@angular/core';
import { Navbars } from '../../home/navbar/navbar';
import { Accueil } from '../../home/accueil/accueil';
import { NotreMission } from '../../home/notre-mission/notre-mission';
import { Environnement } from '../../home/environnement/environnement';
import { Static } from '../../static/static';
import { Contact } from '../../home/contact/contact';
import { Footer } from '../../home/footer/footer';

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
