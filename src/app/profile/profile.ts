import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee';
import { EmployeeProfile } from '../models/employee-profile';

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

import { getApp } from 'firebase/app';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: EmployeeProfile | null = null;

  missionStatus = 'ACTIVE';

  missionDocId = '';

  missionStartDate = '';

  missionEndDate = '';

  constructor(
    private employeeService: EmployeeService
  ) {}

  // ==========================
  // INIT
  // ==========================
  async ngOnInit() {

    this.user =
      await this.employeeService
        .getMyProfileUniversal();

    if (this.user?.name) {

      await this.loadMission(
        this.user.name
      );

    }

  }

  // ==========================
  // LOAD MISSION
  // ==========================
  async loadMission(employeeName: string) {

    const db = getFirestore(getApp());

    const q = query(
      collection(db, 'mission'),
      where('employeeName', '==', employeeName)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {

      const mission = snap.docs[0];

      this.missionDocId = mission.id;

      this.missionStatus =
        mission.data()['status'] || 'ACTIVE';

      this.missionStartDate =
        mission.data()['startDate'] || '';

      this.missionEndDate =
        mission.data()['endDate'] || '';

    }

  }

  // ==========================
  // SAVE MISSION
  // ==========================
  async saveMission() {

    if (!this.missionDocId) {

      alert('⚠️ Aucune mission trouvée.');
      return;

    }

    try {

      const db = getFirestore(getApp());

      const missionRef = doc(
        db,
        `mission/${this.missionDocId}`
      );

      // DATE + HEURE ACTUELLE
      const now = new Date();

      const currentDateTime =

        now.toLocaleDateString('fr-FR')

        + ' ' +

        now.toLocaleTimeString('fr-FR', {

          hour: '2-digit',
          minute: '2-digit'

        });

      // ==========================
      // SI TERMINÉE OU ANNULÉE
      // ==========================
      if (

        this.missionStatus === 'COMPLETED'

        ||

        this.missionStatus === 'CANCELLED'

      ) {

        await updateDoc(missionRef, {

          status: this.missionStatus,

          endDate: currentDateTime

        });

      }

      // ==========================
      // SI ACTIVE
      // ==========================
      else {

        await updateDoc(missionRef, {

          status: this.missionStatus,

          startDate: currentDateTime,

          endDate: null

        });

      }

      alert('✅ Mission mise à jour !');

      // RELOAD
      if (this.user?.name) {

        await this.loadMission(
          this.user.name
        );

      }

    }

    catch (err) {

      console.error(err);

      alert('❌ Erreur lors de la mise à jour.');

    }

  }

}