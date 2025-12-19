import { Component } from '@angular/core';
import { Sidebar } from '../../../sidebar/sidebar';
import { RouterOutlet } from "@angular/router";
import { Topbar } from '../../../topbar/topbar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Sidebar, RouterOutlet,Topbar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
