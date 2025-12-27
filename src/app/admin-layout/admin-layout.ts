import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarAdmin } from '../sidebar-admin/sidebar-admin';
import { Topbar } from '../topbar/topbar';
import { Modal } from '../services/modal';

import { EmployeeModal }
  from '../create-account-modal/create-account-modal';

import { EditEmployeeModal } from '../edit-employee/edit-employee';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarAdmin,
    Topbar,
    EmployeeModal,
    EditEmployeeModal, // ✅ OBLIGATOIRE
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  constructor(public modal: Modal) {}
}
