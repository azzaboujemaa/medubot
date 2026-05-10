import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Mission } from '../services/mission';
import { BeachService } from '../services/beach';

interface MissionData {
  docId?:       string;
  robotId:      string;
  employeeName: string;
  zone:         string;
  startDate:    string;
  endDate:      string | null;
  status:       'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

interface Robot {
  docId: string;
  id:    string;
}

interface Employee {
  id:    string;
  name:  string;
  email: string;
  role:  string;
}

@Component({
  selector:    'app-mission-dashboard',
  standalone:  true,
  imports:     [CommonModule, FormsModule],
  templateUrl: './mission.html',
  styleUrls:   ['./mission.css']
})
export class MissionDashboard implements OnInit {

  private missionService = inject(Mission);
  private firestore      = inject(Firestore);
  private beachService   = inject(BeachService);

  missions:  MissionData[] = [];
  robots:    Robot[]       = [];
  employees: Employee[]    = [];
  zones:     string[]      = [];
  zonesLoading = true;

  showModal = false;

  newMission = {
    robotId:      '',
    employeeName: '',
    zone:         '',
    startDate:    '',
  };

  ngOnInit(): void {
    this.loadMissions();
    this.loadRobots();
    this.loadEmployees();
    this.loadZones();
  }

  loadMissions() {
    this.missionService.getMissions().subscribe(data => {
      this.missions = data as MissionData[];
    });
  }

  loadRobots() {
    collectionData(
      collection(this.firestore, 'robots'),
      { idField: 'docId' }
    ).subscribe((data: any) => {
      this.robots = data;
    });
  }

  loadEmployees() {
    collectionData(
      collection(this.firestore, 'employees'),
      { idField: 'id' }
    ).subscribe((data: any) => {
      this.employees = data.filter(
        (e: Employee) => e.role === 'EMPLOYEE'
      );
    });
  }

  loadZones() {
    this.zonesLoading = true;
    this.beachService.getBeachesTunisia().subscribe({
      next: (res: any) => {
        this.zones = res.elements
          .map((e: any) => e.tags?.name)
          .filter((name: string) => !!name)
          .slice(0, 50);
        this.zonesLoading = false;
      },
      error: (err) => {
        console.error('Erreur zones', err);
        this.zonesLoading = false;
      }
    });
  }

  openModal()  { this.showModal = true; }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

 async addMission() {
  if (
    !this.newMission.robotId      ||
    !this.newMission.employeeName ||
    !this.newMission.zone
  ) {
    alert('⚠️ Veuillez remplir tous les champs.');
    return;
  }

  // Date + heure automatique au moment du lancement
  const now     = new Date();
  const date    = now.toISOString().split('T')[0]; // 2026-05-10
  const time    = now.toLocaleTimeString('fr-FR', {
    hour:   '2-digit',
    minute: '2-digit'
  }); // 09:18
  const startDate = `${date} ${time}`; // 2026-05-10 09:18

  try {
    await this.missionService.addMission({
      ...this.newMission,
      startDate,
    });
    this.closeModal();
  } catch (error) {
    console.error(error);
    alert('❌ Erreur lors de l\'ajout.');
  }
}
  async deleteMission(docId: string | undefined) {
  if (!docId) {
    console.error('docId manquant');
    return;
  }

  const ok = confirm('⚠️ Voulez-vous vraiment supprimer cette mission ?');
  if (!ok) return;

  try {
    await this.missionService.deleteMission(docId);
  } catch (error) {
    console.error('Erreur suppression:', error);
    alert('❌ Erreur lors de la suppression.');
  }
}

  private resetForm() {
    this.newMission = {
      robotId:      '',
      employeeName: '',
      zone:         '',
      startDate:    '',
    };
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'ACTIVE':    return 'En cours';
      case 'COMPLETED': return 'Terminée';
      case 'CANCELLED': return 'Annulée';
      default:          return '';
    }
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
  get robotsDisponibles(): Robot[] {
  const robotsUtilises = this.missions
    .filter(m => m.status === 'ACTIVE')
    .map(m => m.robotId);

  return this.robots.filter(r => !robotsUtilises.includes(r.id));
}

get employeesDisponibles(): Employee[] {
  const employesUtilises = this.missions
    .filter(m => m.status === 'ACTIVE')
    .map(m => m.employeeName);

  return this.employees.filter(e => !employesUtilises.includes(e.name));
}
}