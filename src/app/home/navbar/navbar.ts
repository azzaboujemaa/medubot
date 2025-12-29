import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '../../services/modal';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, FormsModule]
})
export class Navbars implements AfterViewInit {

  email = '';
  password = '';
  loginError = '';

  constructor(
    public modal: Modal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {

    const sections = document.querySelectorAll<HTMLElement>('section');
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            navLinks.forEach(link => {
              link.classList.remove('active-section');

              if (link.getAttribute('data-section') === id) {
                link.classList.add('active-section');
              }
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));
  }

  onForgotPassword() {
    this.modal.openForgotPassword();
  }

  async login() {
    this.loginError = '';

    try {
      const user: any = await this.authService.login(
        this.email,
        this.password
      );

      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }

      this.modal.closeAll();

    } catch (err) {
      this.loginError = 'Email ou mot de passe incorrect';
    }
  }
}
