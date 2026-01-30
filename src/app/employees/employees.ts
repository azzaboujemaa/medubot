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

/* ✅ Interface propre (en dehors du composant) */
interface Employee {
  id: string;   // 🔥 ID Firestore
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'OPERATOR' | 'MAINTENANCE';
  robotId ?: string;
  zone?: string; 
  active: boolean;
  createdAt?: any;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {

  /* 🔥 Stream Firestore */
  employees$!: Observable<Employee[]>;

  constructor(
    public modal: Modal,
    private firestore: Firestore
  ) {}

  /* 🔄 Chargement temps réel */
  ngOnInit() {
    const ref = collection(this.firestore, 'employees');

    this.employees$ = collectionData(ref, {
      idField: 'id'
    }) as Observable<Employee[]>;
  }

  /* ➕ Ajouter */
  addEmployee() {
    this.modal.openCreateAccount();
  }

  /* 🗑️ Supprimer (Firestore) */
 async deleteEmployee(id: string) {

  const ok = confirm(
    '⚠️ Voulez-vous vraiment supprimer cet employé ?'
  );

  if (!ok) {
    return; // ❌ annuler la suppression
  }

  // ✅ supprimer après permission
  await deleteDoc(doc(this.firestore, `employees/${id}`));
}

  /* 🎭 Label rôle */
  getRoleLabel(role: string): string {
    switch (role) {
      
      case 'OPERATOR': return 'Opérateur';
      case 'MAINTENANCE': return 'Maintenance';
      default: return 'Employé';
    }
  }
  editEmployee(emp: Employee) {
  this.modal.openEditEmployee(emp);
}

}
