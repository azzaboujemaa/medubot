import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
   name = '';
  email = '';
  message = '';

  sendMessage() {
    if (!this.name || !this.email || !this.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Ici tu peux envoyer le message à un serveur ou service email
    alert(`Merci ${this.name}, votre message a été envoyé !`);

    // Réinitialiser le formulaire
    this.name = '';
    this.email = '';
    this.message = '';
  }

}
