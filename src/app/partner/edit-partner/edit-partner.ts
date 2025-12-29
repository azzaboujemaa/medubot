import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../services/modal';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-partner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-partner.html',
  styleUrls: ['./edit-partner.css']
})
export class EditPartnerModal implements OnInit {

  partner: any = null;

  constructor(
    public modal: Modal,
    private firestore: Firestore   // ✅ IMPORTANT
  ) {}

  ngOnInit() {
    this.modal.editPartner$.subscribe(p => {
      if (p) {
        this.partner = { ...p }; // copie locale
      }
    });
  }

  async save() {
    if (!this.partner?.id) {
      console.error('ID partenaire manquant');
      return;
    }

    try {
      const ref = doc(this.firestore, `partners/${this.partner.id}`);

      await updateDoc(ref, {
        name: this.partner.name,
        phone: this.partner.phone,
        email: this.partner.email,
        type: this.partner.type,
        startDate: this.partner.startDate,
        endDate: this.partner.endDate || null,
        quantity: this.partner.quantity || 0,
        unit: this.partner.unit || '',
        amount: this.partner.amount ?? null, 
        status: this.partner.status || 'ACTIVE',
        updatedAt: new Date()
      });

      console.log('✅ Partenaire modifié');
      this.modal.closeEditPartner();

    } catch (err) {
      console.error('❌ Erreur modification partenaire', err);
    }
  }

  cancel() {
    this.modal.closeEditPartner();
  }
}
