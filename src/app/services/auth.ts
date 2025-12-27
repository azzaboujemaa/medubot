import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  // 🔐 LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🧑‍💼 CREATE USER (si besoin)
  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🚪 LOGOUT
  logout() {
    return signOut(this.auth);
  }
}
