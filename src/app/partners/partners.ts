import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../services/modal';   // ✅ IMPORT

interface Partner {
  id: number;
  name: string;
  type: 'HOTEL' | 'COSMETIC' | 'FERTILIZER';
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'FINISHED';
  phone: string;
  email: string;
  quantity: number;
  unit: string;
  amount?: number;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrls: ['./partners.css']
})
export class PartnersComponent {

  // ✅ INJECTION DU SERVICE MODAL
  constructor(public modal: Modal) {}

  partners: Partner[] = [
    {
      id: 1,
      name: 'Hôtel El Mouradi',
      type: 'HOTEL',
      startDate: '2024-05-12',
      status: 'ACTIVE',
      phone: '73 200 111',
      email: 'contact@elmouradi.tn',
      quantity: 3.2,
      unit: 'km nettoyés'
    },
    {
      id: 2,
      name: 'BioCosm Lab',
      type: 'COSMETIC',
      startDate: '2024-02-01',
      endDate: '2024-12-20',
      status: 'FINISHED',
      phone: '71 456 789',
      email: 'info@biocosm.tn',
      quantity: 120,
      unit: 'kg de méduses',
      amount: 8400
    }
  ];

  editPartner(p: Partner) {
    console.log('Modifier', p);
  }

  deletePartner(id: number) {
    this.partners = this.partners.filter(p => p.id !== id);
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'HOTEL': return 'Hôtel – Nettoyage';
      case 'COSMETIC': return 'Cosmétique';
      case 'FERTILIZER': return 'Engrais organique';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    return status === 'ACTIVE' ? 'Active' : 'Terminée';
  }
}
