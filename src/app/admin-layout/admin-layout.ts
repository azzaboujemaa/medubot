import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdmin } from '../sidebar-admin/sidebar-admin';
import { Topbar } from "../topbar/topbar";


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarAdmin, Topbar],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayoutComponent {}
