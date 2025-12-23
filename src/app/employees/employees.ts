import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../services/modal';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'OPERATOR' | 'MAINTENANCE';
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent {

  constructor(public modal: Modal) {}

  employees: Employee[] = [
    {
      id: 1,
      name: 'Ahmed Ben Ali',
      email: 'ahmed@medubot.tn',
      phone: '55 123 456',
      role: 'ADMIN'
    },
    {
      id: 2,
      name: 'Sana Trabelsi',
      email: 'sana@medubot.tn',
      phone: '22 987 654',
      role: 'OPERATOR'
    },
    {
      id: 3,
      name: 'Youssef Khalifa',
      email: 'youssef@medubot.tn',
      phone: '99 456 321',
      role: 'MAINTENANCE'
    }
  ];

  // ➕ Ajouter
  addEmployee() {
    this.modal.openCreateAccount();
  }

  // ✏️ Modifier
  editEmployee(emp: Employee) {
    console.log('Modifier', emp);
    // plus tard : ouvrir modale édition
  }

  // 🗑️ Supprimer
  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ADMIN': return 'Admin';
      case 'OPERATOR': return 'Opérateur';
      case 'MAINTENANCE': return 'Maintenance';
      default: return 'Employé';
    }
  }
}
