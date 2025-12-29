import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
   name = '';
  email = '';
  message = '';
constructor(private firestore: Firestore) {}
  async sendMessage() {
    if (!this.name || !this.email || !this.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // 1️⃣ Enregistrer le message
      await addDoc(collection(this.firestore, 'messages'), {
        name: this.name,
        email: this.email,
        message: this.message,
        createdAt: serverTimestamp(),
        read: false
      });

      // 2️⃣ Créer une notification admin
      await addDoc(collection(this.firestore, 'notifications'), {
        type: 'NEW_MESSAGE',
        title: 'Nouveau message',
        content: this.message,
        createdAt: serverTimestamp(),
        read: false
      });

      alert('Merci ! Votre message a été envoyé avec succès ✅');

      // 3️⃣ Reset formulaire
      this.name = '';
      this.email = '';
      this.message = '';

    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’envoi du message ❌');
    }
  }
}


