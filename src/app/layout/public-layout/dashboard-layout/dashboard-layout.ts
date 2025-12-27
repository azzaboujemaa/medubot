import { Component } from '@angular/core';
import { Sidebar } from '../../../sidebar/sidebar';
import { RouterOutlet } from "@angular/router";
import { Topbar } from '../../../topbar/topbar';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true, // 🔥 هذا هو الأهم
  imports: [Sidebar, RouterOutlet, Topbar],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css'],
})
export class DashboardLayout {

}
