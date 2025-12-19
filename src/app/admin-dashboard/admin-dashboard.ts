import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MeduBot {
  id: string;
  status: 'MISSION' | 'IDLE' | 'ALERT' | 'OFFLINE';
  zone: string;
  battery: number;
  jellyfish: number;
  ecoScore: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule, ]
})
export class AdminDashboard {

  medubots: MeduBot[] = [
    {
      id: 'A01',
      status: 'MISSION',
      zone: 'Sousse Nord',
      battery: 82,
      jellyfish: 37,
      ecoScore: 92,
    },
    {
      id: 'A02',
      status: 'IDLE',
      zone: 'Port El Kantaoui',
      battery: 56,
      jellyfish: 12,
      ecoScore: 85,
    },
    {
      id: 'B01',
      status: 'ALERT',
      zone: 'Monastir',
      battery: 19,
      jellyfish: 0,
      ecoScore: 61,
    },
    {
      id: 'C01',
      status: 'OFFLINE',
      zone: 'Sfax',
      battery: 0,
      jellyfish: 0,
      ecoScore: 0,
    },
  ];

  getStatusLabel(status: string): string {
    switch (status) {
      case 'MISSION': return 'En mission';
      case 'IDLE': return 'En attente';
      case 'ALERT': return 'Alerte';
      case 'OFFLINE': return 'Hors ligne';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
