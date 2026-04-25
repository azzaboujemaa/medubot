import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

@Component({
  selector:    'app-robot-card',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './robot-card.html',
  styleUrl:    './robot-card.css',
})
export class RobotCard implements OnInit, OnDestroy {
  robotId  = '';
  beachName = '';
  private dbRef: any = null;

  constructor(private employee: EmployeeService) {}

  async ngOnInit() {
    const profile = await this.employee.getMyProfileUniversal();
    if (!profile) { this.robotId = '---'; return; }

    // Valeur initiale depuis Firestore
    this.robotId   = profile.robotId || '---';
    this.beachName = profile.zone    || '';

    // ✅ Écoute temps réel Firebase Realtime Database
    const auth  = getAuth(getApp());
    const email = auth.currentUser?.email;
    if (!email) return;

    const db  = getDatabase(getApp());
    const key = email.replace(/[.@]/g, '_');
    this.dbRef = ref(db, `profil/${key}`);

    onValue(this.dbRef, (snap) => {
      const val = snap.val();
      if (val) {
        if (val.robot?.name) this.robotId   = val.robot.name;
        if (val.beach?.name) this.beachName = val.beach.name;
      }
    });
  }

  ngOnDestroy() {
    // Nettoyage listener
    if (this.dbRef) off(this.dbRef);
  }
}