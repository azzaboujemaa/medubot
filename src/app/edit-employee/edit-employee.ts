import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Modal } from '../services/modal';

import {
  Firestore,
  doc,
  updateDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css']
})
export class EditEmployeeModal implements OnInit {

  employee: any = null;

  constructor(
    public modal: Modal,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // 🔥 récupérer l’employé à modifier
    this.modal.editEmployee$.subscribe(emp => {
      if (emp) {
        // copie pour éviter la mutation directe
        this.employee = { ...emp };
      }
    });
  }

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
