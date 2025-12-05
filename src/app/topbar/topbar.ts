import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {

  dropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    alert("Déconnexion réussie !");
    // Tu pourras ajouter un vrai logout plus tard
  }

}
