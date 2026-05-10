import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../services/modal';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

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

  // ==========================
  // INIT
  // ==========================
  ngOnInit() {
    this.modal.editEmployee$.subscribe(emp => {
      if (emp) {
        this.employee = { ...emp };
      }
    });
  }

  // ==========================
  // SAVE
  // ==========================
  async save() {
    if (!this.employee?.id) return;

    const ok = confirm(
      `Voulez-vous vraiment enregistrer les modifications de : ${this.employee.name} ?`
    );

    if (!ok) return;

    try {
      const ref = doc(this.firestore, `employees/${this.employee.id}`);

      await updateDoc(ref, {
        name:      this.employee.name,
        role:      this.employee.role,
        active:    this.employee.active ?? true,
        updatedAt: new Date()
      });

      this.modal.closeEditEmployee();

    } catch (err) {
      console.error('Erreur modification employé', err);
      alert('❌ Erreur lors de la modification');
    }
  }

  // ==========================
  // CANCEL
  // ==========================
  cancel() {
    this.modal.closeEditEmployee();
  }
}