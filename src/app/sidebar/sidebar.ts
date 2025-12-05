import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
 isOpen = false;
  
  

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }
  constructor(private router: Router) {}

goDashboard() {
  this.router.navigate(['/dashboard']);
}

goHistory() {
  this.router.navigate(['/history']);
}

goProfile() {
  this.router.navigate(['/profile']);
}
}
