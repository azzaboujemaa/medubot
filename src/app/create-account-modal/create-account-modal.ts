import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../services/modal';

@Component({
  selector: 'app-create-account-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account-modal.html',
  styleUrls: ['./create-account-modal.css']
})
export class CreateAccountModalComponent {

  employee = {
    name: '',
    email: '',
    role: 'EMPLOYEE',
    password: ''
  };

  constructor(public modal: Modal) {}

  close() {
    this.modal.closeCreateAccount();
  }

  submit() {
    console.log('Compte créé :', this.employee);

    // 👉 plus tard : appel API / Firebase ici

    this.modal.closeCreateAccount();
  }
}
