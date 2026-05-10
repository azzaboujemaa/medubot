import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Robot } from '../models/robot';
import { RobotService } from '../services/robot';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminDashboard implements OnInit {

  // ROBOTS FIREBASE
  medubots: any[] = [];

  // MODAL
  showModal = false;

  // NEW ROBOT
  newRobot: Robot = {

    id: '',

    status: 'MISSION',

    battery: 100,

    jellyfish: 0

  };

  constructor(
    private robotService: RobotService
  ) {}

  // ==========================
  // INIT
  // ==========================
  ngOnInit(): void {

    this.loadRobots();

  }

  // ==========================
  // LOAD ROBOTS
  // ==========================
  loadRobots() {

    this.robotService
      .getRobots()
      .subscribe(data => {

        this.medubots = data;

      });

  }

  // ==========================
  // OPEN MODAL
  // ==========================
  openModal() {

    this.showModal = true;

  }

  // ==========================
  // CLOSE MODAL
  // ==========================
  closeModal() {

    this.showModal = false;

  }

  // ==========================
  // ADD ROBOT
  // ==========================
  async addRobot() {

    try {

      const robot: Robot = {

        id: this.newRobot.id,

        status: this.newRobot.status,

        battery: 100,

        jellyfish: 0

      };

      await this.robotService.addRobot(robot);

      // RESET
      this.newRobot = {

        id: '',

        status: 'MISSION',

        battery: 100,

        jellyfish: 0

      };

      this.closeModal();

    }
    catch(error) {

      console.error(error);

    }

  }

  // ==========================
  // DELETE ROBOT
  // ==========================
  async deleteRobot(docId: string) {

    const confirmDelete = confirm(
      'Voulez-vous supprimer ce robot ?'
    );

    if (!confirmDelete) return;

    try {

      await this.robotService.deleteRobot(docId);

      console.log('Robot supprimé');

    }
    catch(error) {

      console.error(
        'Erreur suppression robot',
        error
      );

    }

  }

  // ==========================
  // STATUS LABEL
  // ==========================
  getStatusLabel(status: Robot['status']): string {

    switch (status) {

      case 'MISSION':
        return 'En mission';

      case 'BREAKDOWN':
        return 'En panne';

      case 'ALERT':
        return 'Alerte';

      case 'OFFLINE':
        return 'Hors ligne';

      default:
        return '';

    }

  }

  // ==========================
  // STATUS CLASS
  // ==========================
  getStatusClass(status: Robot['status']): string {

    return status.toLowerCase();

  }

}