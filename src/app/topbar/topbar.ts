import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar implements OnInit{

  dropdownOpen = false;
  notificationOpen = false;

  unreadCount = 0;

  notifications : any []=[];
   
  

  constructor(private router: Router,
    private firestore: Firestore
  ) {}

   ngOnInit() {
    const q = query(
      collection(this.firestore, 'notifications'),
      where('read', '==', false)
    );

    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.notifications = data;
      this.unreadCount = data.length;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleNotifications() {
    this.notificationOpen = !this.notificationOpen;
  }

  closeNotifications() {
    this.notificationOpen = false;
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    alert('Déconnexion réussie !');
  }
  openAllMessages() {
    this.notificationOpen = false;
    this.router.navigateByUrl('/admin/messages');
  }


}
