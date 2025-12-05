import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [FormsModule]
})
export class Profile {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    photoURL: '',
    robotId: '' 
  };

  constructor() {
    this.loadProfile();
  }

  loadProfile() {
    const savedUser = localStorage.getItem('userProfile');

    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.user));
    alert("Profil sauvegardé !");
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.user.photoURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  robotList = [
  { id: 'MB-201', name: 'MeduBot 201' },
  { id: 'MB-202', name: 'MeduBot 202' },
  { id: 'MB-203', name: 'MeduBot 203' },
  { id: 'MB-300', name: 'MeduBot 300 – Prototype' }
];
}
