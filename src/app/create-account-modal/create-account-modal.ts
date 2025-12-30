import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '../services/modal';
import { BeachService } from '../services/beach';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account-modal.html',
  styleUrls: ['./create-account-modal.css']
})
export class EmployeeModal implements OnInit {

  // 👤 Employé
  employee = {
    name: '',
    email: '',
    role: 'EMPLOYEE'
  };

  // 🤖 Robots
  robotIds: string[] = [
    'MeduBot A01',
    'MeduBot A02',
    'MeduBot B01',
    'MeduBot C01',
    'MeduBot D01',
    'MeduBot E01'
  ];

  // 🏖️ Zones (API)
  zones: string[] = [];

  robotId = '';
  zone = '';

  password = '';
  confirmPassword = '';

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private beachService: BeachService,
    public modal: Modal
  ) {}

  // ==========================
  // 🚀 INIT
  // ==========================
  ngOnInit() {
    this.loadBeaches();
  }

  // ==========================
  // 🏖️ LOAD BEACHES FROM API
  // ==========================
  loadBeaches() {
    this.beachService.getBeachesTunisia().subscribe({
      next: (res: any) => {
        this.zones = res.elements
          .map((e: any) => e.tags?.name)
          .filter((name: string) => !!name)
          .slice(0, 50);
      },
      error: (err) => {
        console.error('Erreur chargement plages', err);
      }
    });
  }

  // ==========================
  // 📩 SUBMIT
  // ==========================
  async submit() {
    this.error = '';

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

      const cred = await this.authService.createUser(
        this.employee.email,
        this.password
      );

      const uid = cred.user.uid;

      await setDoc(doc(this.firestore, `employees/${uid}`), {
        name: this.employee.name,
        email: this.employee.email,
        role: this.employee.role,
        robotId: this.robotId,
        zone: this.zone,
        active: true,
        createdAt: serverTimestamp()
      });

      // reset
      this.employee = { name: '', email: '', role: 'EMPLOYEE' };
      this.robotId = '';
      this.zone = '';
      this.password = '';
      this.confirmPassword = '';

      this.close();

    } catch (err: any) {
      console.error(err);
      this.error =
        err.code === 'auth/email-already-in-use'
          ? 'Cet email est déjà utilisé'
          : 'Erreur lors de la création';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modal.closeCreateAccount();
  }
}
