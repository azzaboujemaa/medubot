import { Component } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Modal } from '../services/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.css'],
  imports: [FormsModule, CommonModule]
})
export class ForgotPasswordComponent {

  email: string = '';
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(
    private auth: Auth,
    private modal: Modal
  ) {}

  async sendResetEmail() {
    this.message = '';
    this.error = '';

    if (!this.email) {
      this.error = 'Veuillez saisir votre adresse e-mail.';
      return;
    }

    try {
      this.loading = true;
      await sendPasswordResetEmail(this.auth, this.email);
      this.message = 'Un e-mail de réinitialisation a été envoyé.';
    } catch (err: any) {
      this.error = 'Erreur : adresse e-mail invalide ou non trouvée.';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modal.closeForgotPassword();
  }

  backToLogin() {
    this.modal.openSignIn();
  }
}