import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';

import {
  getDatabase,
  ref,
  onValue,
  off
} from 'firebase/database';

import { getApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

@Component({
  selector: 'app-robot-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './robot-card.html',
  styleUrl: './robot-card.css',
})
export class RobotCard implements OnInit, OnDestroy {

  // ==========================
  // ROBOT
  // ==========================
  robotId = '';
  beachName = '';

  // ==========================
  // MISSION
  // ==========================
  missionZone = '';

  missionStartDate = '';

  missionEndDate = '';

  missionStatus = '';

  hasMission = false;

  // ==========================
  // LISTENERS
  // ==========================
  private dbRef: any = null;

  private unsubMission: any = null;

  constructor(
    private employee: EmployeeService
  ) {}

  // ==========================
  // INIT
  // ==========================
  async ngOnInit() {

    const profile =
      await this.employee.getMyProfileUniversal();

    if (!profile) {

      this.robotId = '---';

      return;

    }

    // ==========================
    // DEFAULT VALUES
    // ==========================
    this.robotId =
      profile.robotId || '---';

    this.beachName =
      profile.zone || '';

    // ==========================
    // REALTIME DATABASE
    // ==========================
    const auth = getAuth(getApp());

    const email = auth.currentUser?.email;

    if (!email) return;

    const db = getDatabase(getApp());

    const key = email.replace(/[.@]/g, '_');

    this.dbRef = ref(
      db,
      `profil/${key}`
    );

    onValue(this.dbRef, (snap) => {

      const val = snap.val();

      if (val) {

        // ⚠️ CHANGER ROBOT SEULEMENT
        // SI PAS DE MISSION
        if (
          val.robot?.name &&
          !this.hasMission
        ) {

          this.robotId =
            val.robot.name;

        }

        if (val.beach?.name) {

          this.beachName =
            val.beach.name;

        }

      }

    });

    // ==========================
    // LISTEN MISSION
    // ==========================
    const employeeName =
      profile.name || '';

    this.listenMission(employeeName);

  }

  // ==========================
  // LISTEN MISSIONS
  // ==========================
  listenMission(employeeName: string) {

    const db = getFirestore(getApp());

    const q = query(

      collection(db, 'mission'),

      where(
        'employeeName',
        '==',
        employeeName
      )

    );

    this.unsubMission = onSnapshot(q, (snap) => {

      if (!snap.empty) {

        // ==========================
        // GET ALL MISSIONS
        // ==========================
        const missions = snap.docs.map(doc => doc.data());

        // ==========================
        // GET LATEST MISSION
        // ==========================
        const latestMission = missions.sort(
          (a: any, b: any) => {

            return (
              new Date(
                b['startDate']
              ).getTime()

              -

              new Date(
                a['startDate']
              ).getTime()
            );

          }
        )[0];

        // ==========================
        // UPDATE DATA
        // ==========================
        this.hasMission = true;

        this.robotId =
          latestMission['robotId'] || '';

        this.missionZone =
          latestMission['zone'] || '';

        this.missionStartDate =
          latestMission['startDate'] || '';

        this.missionEndDate =
          latestMission['endDate'] || '';

        this.missionStatus =
          latestMission['status'] || '';

      }

    });

  }

  // ==========================
  // STATUS LABEL
  // ==========================
  getStatusLabel(status: string): string {

    switch(status) {

      case 'ACTIVE':
        return 'En cours';

      case 'COMPLETED':
        return 'Terminée';

      case 'CANCELLED':
        return 'Annulée';

      default:
        return status;

    }

  }

  // ==========================
  // DESTROY
  // ==========================
  ngOnDestroy() {

    if (this.dbRef) {

      off(this.dbRef);

    }

    if (this.unsubMission) {

      this.unsubMission();

    }

  }

}