import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../services/modal';

import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

/* ✅ MODELE FIRESTORE */
export interface PartnerModel {
  id: string; // 🔥 ID Firestore
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
  templateUrl: './partner.html',
  styleUrls: ['./partner.css']
})
export class Partner implements OnInit {

  // 🔥 Stream Firestore
  partners$!: Observable<PartnerModel[]>;

  constructor(
    public modal: Modal,
    private firestore: Firestore
  ) {}

  /* 🔄 Chargement Firestore temps réel */
  ngOnInit() {
    const ref = collection(this.firestore, 'partners');

    this.partners$ = collectionData(ref, {
      idField: 'id'
    }) as Observable<PartnerModel[]>;
  }

  /* ✏️ Modifier */
  editPartner(p: PartnerModel) {
    this.modal.openEditPartner(p);
  }

  /* 🗑️ Supprimer */
async deletePartner(id: string) {

  const ok = confirm(
    '⚠️ Voulez-vous vraiment supprimer ce partenaire ?'
  );

  if (!ok) {
    return; // ❌ annuler la suppression
  }

  try {
    await deleteDoc(doc(this.firestore, `partners/${id}`));
  } catch (err) {
    console.error('Erreur suppression partenaire', err);
    alert('❌ Erreur lors de la suppression');
  }
}


  /* 🎭 Labels */
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
  getQuantityLabel(partnerType: string): string {
  if (partnerType === 'HOTEL') {
    return 'Quantité ramassée (kg)';
  }
  if (partnerType === 'LAB') {
    return 'Quantité vendue (kg)';
  }
  return 'Quantité (kg)';
}

}
