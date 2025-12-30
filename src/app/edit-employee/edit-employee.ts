import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../services/modal';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { BeachService } from '../services/beach';

@Component({
  selector: 'app-edit-employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css']
})
export class EditEmployeeModal implements OnInit {

  employee: any = null;

  // 🤖 Robots
  robotIds: string[] = [
    'MeduBot A01',
    'MeduBot A02',
    'MeduBot B01',
    'MeduBot C01',
    'MeduBot D01',
    'MeduBot E01'
  ];

  // 🏖️ Zones depuis API
  zones: string[] = [];

  constructor(
    public modal: Modal,
    private firestore: Firestore,
    private beachService: BeachService
  ) {}

  ngOnInit() {
    // 👤 employé à modifier
    this.modal.editEmployee$.subscribe(emp => {
      if (emp) {
        this.employee = { ...emp };
      }
    });

    // 🌍 charger plages
    this.loadBeaches();
  }

  // =====================
  // 🏖️ PLAGES API
  // =====================
  loadBeaches() {
    this.beachService.getBeachesTunisia().subscribe({
      next: (res: any) => {
        this.zones = res.elements
          .map((e: any) => e.tags?.name)
          .filter((name: string) => !!name)
          .slice(0, 50);
      },
      error: (err) => {
        console.error('Erreur plages', err);
      }
    });
  }

  // =====================
  // 💾 SAVE
  // =====================
  async save() {
    if (!this.employee?.id) return;

    const ref = doc(this.firestore, `employees/${this.employee.id}`);

    await updateDoc(ref, {
      name: this.employee.name,
      role: this.employee.role,
      robotId: this.employee.robotId || null,
      zone: this.employee.zone || null,
      active: this.employee.active ?? true,
      updatedAt: new Date()
    });

    this.modal.closeEditEmployee();
  }

  cancel() {
    this.modal.closeEditEmployee();
  }
}
