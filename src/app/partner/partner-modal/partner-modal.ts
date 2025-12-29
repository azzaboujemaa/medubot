import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../services/modal';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-partner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partner-modal.html',
  styleUrls: ['./partner-modal.css']
})
export class PartnerModal {

  partner = {
    name: '',
    type: 'HOTEL',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
    quantity: 0,
    unit: ''
  };

  constructor(public modal: Modal,
    private firestore: Firestore
  ) {}
  async submit() {
    try {
      const ref = collection(this.firestore, 'partners');

      await addDoc(ref, {
        ...this.partner,
        createdAt: serverTimestamp()
      });

      this.modal.closePartner();
    } catch (err) {
      console.error('Erreur ajout partenaire', err);
    }
  }

  close() {
    this.modal.closePartner();
  }

 
}
