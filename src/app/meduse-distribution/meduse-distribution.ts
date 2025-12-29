import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-meduse-distribution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meduse-distribution.html',
  styleUrls: ['./meduse-distribution.css']
})
export class MeduseDistribution implements OnInit {

  // 🔥 Données Firestore
  partners: any[] = [];

  // 📊 KPI (alignés avec le HTML)
  collectedKg = 0;
  soldCosmeticKg = 0;
  soldFertilizerKg = 0;
  stockKg = 0;
  lostKg = 120; // pertes métier
  revenueDT = 0;

  zones = [
    { name: 'Sousse Nord', quantityKg: 420 },
    { name: 'Hammamet', quantityKg: 310 },
    { name: 'Bizerte', quantityKg: 180 },
    { name: 'Mahdia', quantityKg: 140 }
  ];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    collectionData(collection(this.firestore, 'partners'))
      .subscribe(data => {
        this.partners = data;
        this.calculateStats();
      });
  }

  calculateStats() {
    // reset
    this.collectedKg = 0;
    this.soldCosmeticKg = 0;
    this.soldFertilizerKg = 0;
    this.revenueDT = 0;

    for (const p of this.partners) {

      // 🏨 Collecte (Hôtels)
      if (p.type === 'HOTEL') {
        this.collectedKg += p.quantity || 0;
      }

      // 🧴 Cosmétique
      if (p.type === 'COSMETIC') {
        this.soldCosmeticKg += p.quantity || 0;
      }

      // 🌱 Engrais
      if (p.type === 'FERTILIZER') {
        this.soldFertilizerKg += p.quantity || 0;
      }

      // 💰 Chiffre d’affaires
      if (p.amount) {
        this.revenueDT += p.amount;
      }
    }

    // 📦 Stock restant
    this.stockKg =
      this.collectedKg -
      (this.soldCosmeticKg + this.soldFertilizerKg) -
      this.lostKg;
  }

  // ♻️ Taux de valorisation
  get valorisationRate(): number {
    if (this.collectedKg === 0) return 0;
    return Math.round(
      ((this.soldCosmeticKg + this.soldFertilizerKg) / this.collectedKg) * 100
    );
  }
}
