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
    // 1️⃣ Message client
    await addDoc(collection(this.firestore, 'messages'), {
      name: this.name,
      email: this.email,
      message: this.message,
      createdAt: serverTimestamp(),
      read: false
    });

    // 2️⃣ Notification ADMIN
    await addDoc(collection(this.firestore, 'notifications'), {
      title: 'Nouveau message',
      content: this.message,
      type: 'CONTACT',
      toRole: 'ADMIN',   // 🔥 CLÉ
      read: false,
      createdAt: serverTimestamp()
    });

    alert('Message envoyé ✅');

    this.name = '';
    this.email = '';
    this.message = '';

  } catch (e) {
    console.error(e);
    alert('Erreur ❌');
  }
}
}

