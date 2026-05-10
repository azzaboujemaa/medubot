import { Component } from '@angular/core';

import { AuthService } from '../services/auth';

import {
  Firestore,
  doc,
  setDoc
} from '@angular/fire/firestore';

import { serverTimestamp } from 'firebase/firestore';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Modal } from '../services/modal';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account-modal.html',
  styleUrls: ['./create-account-modal.css']
})
export class EmployeeModal {

  // ==========================
  // 👤 EMPLOYEE
  // ==========================
  employee = {

    name: '',

    email: '',

    role: 'EMPLOYEE'

  };

  // ==========================
  // 🔐 PASSWORDS
  // ==========================
  password = '';

  confirmPassword = '';

  // ==========================
  // UI
  // ==========================
  loading = false;

  error = '';

  constructor(

    private authService: AuthService,

    private firestore: Firestore,

    public modal: Modal

  ) {}

  // ==========================
  // 📩 SUBMIT
  // ==========================
  async submit() {

    this.error = '';

    // PASSWORD CHECK
    if (this.password !== this.confirmPassword) {

      this.error =
        'Les mots de passe ne correspondent pas';

      return;

    }

    try {

      this.loading = true;

      // 🔐 CREATE AUTH ACCOUNT
      const cred = await this.authService.createUser(

        this.employee.email,

        this.password

      );

      const uid = cred.user.uid;

      // 💾 SAVE FIRESTORE
      await setDoc(

        doc(this.firestore, `employees/${uid}`),

        {

          name: this.employee.name,

          email: this.employee.email,

          role: this.employee.role,

          active: true,

          createdAt: serverTimestamp()

        }

      );

      // 🔄 RESET
      this.employee = {

        name: '',

        email: '',

        role: 'EMPLOYEE'

      };

      this.password = '';

      this.confirmPassword = '';

      this.close();

    }
    catch (err: any) {

      console.error(err);

      this.error =

        err.code === 'auth/email-already-in-use'

          ? 'Cet email est déjà utilisé'

          : 'Erreur lors de la création';

    }
    finally {

      this.loading = false;

    }

  }

  // ==========================
  // ❌ CLOSE MODAL
  // ==========================
  close() {

    this.modal.closeCreateAccount();

  }

}