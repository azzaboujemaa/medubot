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

interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
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

  employees$!: Observable<Employee[]>;

  constructor(
    public modal: Modal,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const ref = collection(this.firestore, 'employees');
    this.employees$ = collectionData(ref, {
      idField: 'id'
    }) as Observable<Employee[]>;
  }

  addEmployee() {
    this.modal.openCreateAccount();
  }

  async deleteEmployee(id: string) {
    const ok = confirm('⚠️ Voulez-vous vraiment supprimer cet employé ?');
    if (!ok) return;
    await deleteDoc(doc(this.firestore, `employees/${id}`));
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ADMIN':       return 'Admin';
      case 'EMPLOYEE':    return 'Employé';
      default:            return 'Employé';
    }
  }

  editEmployee(emp: Employee) {
    this.modal.openEditEmployee(emp);
  }
}