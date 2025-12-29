import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // =========================
  // 🔐 LOGIN + ROLE
  // =========================
  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    // ADMIN
    const adminRef = doc(this.firestore, `users/${uid}`);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      return { ...adminSnap.data(), role: 'ADMIN' };
    }

    // EMPLOYEE / OPERATOR / MAINTENANCE
    const empRef = doc(this.firestore, `employees/${uid}`);
    const empSnap = await getDoc(empRef);

    if (empSnap.exists()) {
      return empSnap.data();
    }

    throw new Error('Utilisateur non trouvé');
  }

  // =========================
  // 🧑‍💼 CREATE USER
  // =========================
  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // =========================
  // 🚪 LOGOUT
  // =========================
  logout() {
    return signOut(this.auth);
  }
}
