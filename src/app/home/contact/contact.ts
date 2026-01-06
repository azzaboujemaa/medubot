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

  errorMessage = '';
  showSuccess = false;

  constructor(private firestore: Firestore) {}

  async sendMessage() {

    // ❌ VALIDATION
    if (!this.name || !this.email || !this.message) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.errorMessage = '';

    try {
      // 📩 MESSAGE CLIENT
      await addDoc(collection(this.firestore, 'messages'), {
        name: this.name,
        email: this.email,
        message: this.message,
        createdAt: serverTimestamp(),
        read: false
      });

      // 🔔 NOTIFICATION ADMIN
      await addDoc(collection(this.firestore, 'notifications'), {
        title: 'Nouveau message',
        content: this.message,
        type: 'CONTACT',
        toRole: 'ADMIN',
        read: false,
        createdAt: serverTimestamp()
      });

      // RESET FORM
      this.name = '';
      this.email = '';
      this.message = '';

      // ✅ SUCCESS OVERLAY
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);

    } catch (e) {
      console.error(e);
      this.errorMessage = 'Erreur lors de l’envoi ❌';
    }
  }
}
