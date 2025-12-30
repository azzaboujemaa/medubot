import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { BeachService } from '../services/beach';
import { EmployeeProfile } from '../models/employee-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user!: EmployeeProfile;
  zones: string[] = [];

  robotList = [
    { id: 'MeduBot A01', name: 'MeduBot A01' },
    { id: 'MeduBot A02', name: 'MeduBot A02' },
    { id: 'MeduBot B01', name: 'MeduBot B01' },
    { id: 'MeduBot C01', name: 'MeduBot C01' },
    { id: 'MeduBot D01', name: 'MeduBot D01' }
  ];

  constructor(
    private employeeService: EmployeeService,
    private beach: BeachService
  ) {}

  async ngOnInit() {
    this.user = await this.employeeService.getMyProfileUniversal();
    this.loadBeaches();
  }

  loadBeaches() {
    this.beach.getBeachesTunisia().subscribe(res => {
      this.zones = res.elements
        .map((e: any) => e.tags?.name)
        .filter(Boolean)
        .slice(0, 50);
    });
  }

  async saveProfile() {
    await this.employeeService.updateMyProfile(
      this.user.robotId || '',
      this.user.zone || ''
    );
    alert('Profil mis à jour ✅');
  }
}
