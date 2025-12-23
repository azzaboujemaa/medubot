import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MeduBot {
  id: string;
  status: 'MISSION' | 'BREAKDOWN' | 'ALERT' | 'OFFLINE';
  zone: string;
  battery: number;
  jellyfish: number;
  ecoScore: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule],
})
export class AdminDashboard {

  medubots: MeduBot[] = [
    { id: 'A01', status: 'MISSION', zone: 'Sousse Nord', battery: 82, jellyfish: 37, ecoScore: 92 },
    { id: 'A02', status: 'BREAKDOWN', zone: 'Port El Kantaoui', battery: 56, jellyfish: 12, ecoScore: 85 },
    { id: 'B01', status: 'ALERT', zone: 'Monastir', battery: 19, jellyfish: 0, ecoScore: 61 },
    { id: 'C01', status: 'OFFLINE', zone: 'Sfax', battery: 0, jellyfish: 0, ecoScore: 0 },
    { id: 'D01', status: 'MISSION', zone: 'Mahdia', battery: 74, jellyfish: 21, ecoScore: 88 },
    { id: 'E01', status: 'BREAKDOWN', zone: 'Bizerte', battery: 63, jellyfish: 9, ecoScore: 79 },
  ];

  // 🔹 TEXTE DU STATUS
  getStatusLabel(status: MeduBot['status']): string {
    switch (status) {
      case 'MISSION': return 'En mission';
      case 'BREAKDOWN': return 'En panne';
      case 'ALERT': return 'Alerte';
      case 'OFFLINE': return 'Hors ligne';
      default: return '';
    }
  }

  // 🔹 CLASSE CSS DU STATUS
  getStatusClass(status: MeduBot['status']): string {
    return status.toLowerCase(); // mission | idle | alert | offline
  }
}
