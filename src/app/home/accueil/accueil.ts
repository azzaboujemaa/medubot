import { Component } from '@angular/core';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
  standalone: true
})
export class Accueil {
  constructor(public modal: Modal) {}

  openCreateAccount() {
    this.modal.openCreateAccount();  // ouvre la modale du Navbar
  }

  openSignIn() {
    this.modal.openSignIn();
  }
  
}