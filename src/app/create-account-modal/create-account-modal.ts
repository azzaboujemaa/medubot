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

  // 👤 Employé
  employee = {
    name: '',
    email: '',
    role: 'EMPLOYEE'
  };

  // 🤖 Robots disponibles
  robotIds: string[] = [
    'MeduBot A01',
    'MeduBot A02',
    'MeduBot B01',
    'MeduBot C01',
    'MeduBot D01',
    'MeduBot E01'
  ];

  // 🏖️ Zones
  zones: string[] = [
    'Sousse Nord',
    'Port El Kantaoui',
    'Monastir',
    'Mahdia',
    'Sfax',
    'Bizerte'
  ];

  // ✅ Sélections
  robotId: string = '';
  zone: string = '';

  // 🔐 Mot de passe
  password = '';
  confirmPassword = '';

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

    // 🔒 VALIDATIONS
    if (!this.robotId) {
      this.error = 'Veuillez choisir un robot';
      return;
    }

    if (!this.zone) {
      this.error = 'Veuillez choisir une zone de plage';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    try {
      this.loading = true;

      // 🔐 Création Auth
      const cred = await this.authService.createUser(
        this.employee.email,
        this.password
      );

      const uid = cred.user.uid;

      // 💾 Firestore
      const ref = doc(this.firestore, `employees/${uid}`);

      await setDoc(ref, {
        name: this.employee.name,
        email: this.employee.email,
        role: this.employee.role,
        robotId: this.robotId,
        zone: this.zone,
        active: true,
        createdAt: serverTimestamp()
      });

      // ✅ RESET FORM (optionnel mais pro)
      this.employee = { name: '', email: '', role: 'EMPLOYEE' };
      this.robotId = '';
      this.zone = '';
      this.password = '';
      this.confirmPassword = '';

      // ✅ FERMER LA MODAL
      this.close();

    } catch (err: any) {
      console.error(err);
      this.error = err.message || 'Erreur lors de la création';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modal.closeCreateAccount();
  }
}
