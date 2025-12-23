import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-partner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partner-modal.html',
  styleUrls: ['./partner-modal.css']
})
export class PartnerModalComponent {

  partner = {
    name: '',
    type: 'HOTEL',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
    quantity: 0,
    unit: '',
    amount: 0
  };

  constructor(public modal: Modal) {}

  close() {
    this.modal.closePartner();
  }

  submit() {
    console.log('Partenaire ajouté :', this.partner);

    // 🔜 plus tard : API / Firebase
    this.modal.closePartner();
  }
}
