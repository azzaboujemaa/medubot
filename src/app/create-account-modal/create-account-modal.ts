import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
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

  employee = {
    name: '',
    email: '',
    role: 'EMPLOYEE'
  };

  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    public modal: Modal        // 🔥 ICI
  ) {}

  async submit() {
    this.loading = true;
    this.error = '';

    try {
      const cred = await this.authService.createUser(
        this.employee.email,
        this.password
      );

      const uid = cred.user.uid;

      const ref = doc(this.firestore, `employees/${uid}`);

      await setDoc(ref, {
        name: this.employee.name,
        email: this.employee.email,
        role: this.employee.role,
        active: true,
        createdAt: serverTimestamp()
      });

      alert('Employé créé avec succès ✅');
      this.close();   // 🔥 FERMETURE OK

    } catch (err: any) {
      console.error(err);
      this.error = err.message || 'Erreur lors de la création';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modal.closeCreateAccount();   // 🔥 ESSENTIEL
  }
}
