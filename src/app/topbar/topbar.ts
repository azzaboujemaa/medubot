import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore';
import { Auth, signOut } from '@angular/fire/auth';
import { EmployeeService } from '../services/employee';
import { EmployeeProfile } from '../models/employee-profile';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar implements OnInit {

  dropdownOpen = false;
  notificationOpen = false;

  unreadCount = 0;
  notifications: any[] = [];

  userName = '';
  userRole: EmployeeProfile['role'] | null = null;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {

    const profile = await this.employeeService.getMyProfileUniversal();

    this.userName = profile.name;
    this.userRole = profile.role;

    console.log('✅ USER ROLE:', this.userRole);

    // ✅ فقط ADMIN
    if (this.userRole?.trim().toUpperCase() === 'ADMIN') {

      const q = query(
        collection(this.firestore, 'notifications'),
        where('toRole', '==', 'ADMIN'),
        where('read', '==', false)
      );

      collectionData(q, { idField: 'id' }).subscribe(data => {
        console.log('🔔 NOTIFS ADMIN:', data);

        // 🔥 الترتيب في Angular (آخر message يطلع اللّول)
        this.notifications = data.sort((a: any, b: any) => {
          const t1 = a.createdAt?.toMillis?.() || 0;
          const t2 = b.createdAt?.toMillis?.() || 0;
          return t2 - t1; // DESC
        });

        this.unreadCount = this.notifications.length;
      });

    } else {
      this.notifications = [];
      this.unreadCount = 0;
    }
  }

  // =========================
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleNotifications() {
    this.notificationOpen = !this.notificationOpen;
  }

  closeNotifications() {
    this.notificationOpen = false;
  }

  goProfile() {
    this.router.navigate(['/dashboard/profile']);
    this.dropdownOpen = false;
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/accueil']);
  }

  openAllMessages() {
    this.notificationOpen = false;

    const role = this.userRole?.trim().toUpperCase();

    if (role === 'ADMIN') {
      this.router.navigate(['/admin/messages']);
    }

    if (role === 'EMPLOYEE') {
      this.router.navigate(['/dashboard/chat']);
    }
  }
}
