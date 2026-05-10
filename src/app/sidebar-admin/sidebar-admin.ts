import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Modal } from '../services/modal';
import { getFirestore, collectionGroup, onSnapshot,
         query, where } from 'firebase/firestore';
import { getApp } from 'firebase/app';

@Component({
  selector:    'app-sidebar-admin',
  standalone:  true,
  imports:     [CommonModule, RouterModule],
  templateUrl: './sidebar-admin.html',
  styleUrl:    './sidebar-admin.css',
})
export class SidebarAdmin implements OnInit, OnDestroy {

  isOpen     = false;
  hasUnread  = false;
  unreadCount = 0;
  private unsubscribe: any = null;

  constructor(private router: Router, public modal: Modal) {}

  ngOnInit() {
    // Écouter tous les messages non lus des techniciens en temps réel
    const db = getFirestore(getApp());
    const q  = query(
      collectionGroup(db, 'messages'),
      where('senderRole', '==', 'technicien'),
      where('read', '==', false)
    );

    this.unsubscribe = onSnapshot(q, (snap) => {
      this.unreadCount = snap.size;
      this.hasUnread   = snap.size > 0;
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  openSidebar()  { this.isOpen = true;  }
  closeSidebar() { this.isOpen = false; }

  goAdminDashboard()     { this.router.navigate(['/admin/dashboard']);             }
  goRobots()             { this.router.navigate(['/admin/dashboard']);             }
  goMissions() { this.router.navigate(['/admin/missions']); }
  goMap()                { this.router.navigate(['/admin/robots-map']);            }
  goEmployees()          { this.router.navigate(['/admin/employees']);             }
  goCreateEmployee()     { this.modal.openCreateAccount();                         }
  goPartners()           { this.router.navigate(['/admin/partners']);              }
  goJellyfishAnalytics() { this.router.navigate(['/admin/meduse-distribution']);  }
  goChat()               { this.router.navigate(['/admin/admin-chat']);                  }

  logout() { this.router.navigate(['/']); }
}