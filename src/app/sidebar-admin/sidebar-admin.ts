import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Modal } from '../services/modal';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css',
})
export class SidebarAdmin {

  isOpen = false;

  constructor(private router: Router,
    public modal:Modal 
  ) {}

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  goAdminDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  goRobots() {
    this.router.navigate(['/admin/robots']);
  }

  goMap() {
    this.router.navigate(['/admin/map']);
  }

  goEmployees() {
  this.router.navigate(['/admin/employees']);
}


  goCreateEmployee() {
    this.modal.openCreateAccount();   // 🔥 ouvre la fenêtre
  }

  goPartners() {
    this.router.navigate(['/admin/partners']);
  }

  goJellyfishAnalytics() {
    this.router.navigate(['/admin/jellyfish-analytics']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }
   // 🔥 ouvre la modale
  }

