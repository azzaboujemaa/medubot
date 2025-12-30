import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {

  isOpen = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  // =====================
  // UI
  // =====================
  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  // =====================
  // NAVIGATION
  // =====================
  goDashboard() {
    this.router.navigate(['/dashboard/dashboard']);
  }

  goHistory() {
    this.router.navigate(['/dashboard/history']);
  }

  goProfile() {
    this.router.navigate(['/dashboard/profile']);
  }

  goChat() {
    this.router.navigate(['/dashboard/chat']);
  }

  // =====================
  // 🚪 LOGOUT
  // =====================
  async logout() {
    try {
      await this.auth.logout();   // Firebase signOut
      localStorage.clear();       // nettoyage local
      this.router.navigate(['/accueil']); // retour HOME
    } catch (e) {
      console.error('Erreur logout', e);
    }
  }
}
