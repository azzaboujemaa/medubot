import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarAdmin } from '../sidebar-admin/sidebar-admin';
import { Topbar } from '../topbar/topbar';
import { Modal } from '../services/modal';

import { EmployeeModal }
  from '../create-account-modal/create-account-modal';

import { EditEmployeeModal } from '../edit-employee/edit-employee';
import { PartnerModal } from '../partner/partner-modal/partner-modal';
import { EditPartnerModal } from '../partner/edit-partner/edit-partner';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarAdmin,
    Topbar,
    EmployeeModal,
    EditEmployeeModal,
    PartnerModal,
    EditPartnerModal,
    // ✅ OBLIGATOIRE
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  constructor(public modal: Modal) {}
}
