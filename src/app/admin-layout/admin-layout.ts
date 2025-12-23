import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarAdmin } from '../sidebar-admin/sidebar-admin';
import { Topbar } from '../topbar/topbar';
import { Modal } from '../services/modal';
import { CreateAccountModalComponent } 
  from '../create-account-modal/create-account-modal';
  import { PartnerModalComponent } from '../partners/partner-modal/partner-modal';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,          // indispensable pour *ngIf
    RouterOutlet,
    SidebarAdmin,
    Topbar,
    CreateAccountModalComponent,
      PartnerModalComponent
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent {
  constructor(public modal: Modal) {}
}
