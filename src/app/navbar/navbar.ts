import { Component, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '../services/modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [
    CommonModule,
    FormsModule,
    
  ]
})
export class Navbars implements AfterViewInit{
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  submitted = false;

  constructor(public modal: Modal) {}

  ngAfterViewInit() {

    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');

          if (entry.isIntersecting) {
            links.forEach(link => {
              link.classList.remove('active-section'); // retire le style des autres

              if (link.getAttribute('data-section') === id) {
                link.classList.add('active-section'); // applique au bon
              }
            });
          }
        });
      },
      {
        threshold: 0.6 // 60% visible → devient actif
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  // Ouvrir modales
  openSignIn() {
    this.modal.openSignIn();
  }

  openCreateAccount() {
    this.modal.openCreateAccount();
  }

  // Fermer toutes les modales
  closeModal() {
    this.modal.closeAll();
  }

  // Création de compte
  createAccount() {
    this.submitted = true;

    if (
      !this.fullName ||
      !this.isValidEmail(this.email) ||
      !this.isValidPassword(this.password) ||
      this.password !== this.confirmPassword
    ) {
      console.log('❌ Formulaire invalide');
      return;
    }

    alert('✅ Compte créé avec succès !');
    this.resetForm();
    this.modal.openSignIn(); // ouvre Sign In après création
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordPattern.test(password);
  }

  resetForm() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.submitted = false;
  }
}
