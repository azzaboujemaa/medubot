import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // 🔥 IMPORTANT !
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(private auth: Auth) {}

  ngOnInit() {
    console.log('USER:', this.auth.currentUser);
  }
}