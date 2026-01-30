import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { EmployeeProfile } from '../models/employee-profile';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // =========================
  // ⏳ attendre Firebase Auth (IMPORTANT)
  // =========================
  private waitForAuth(): Promise<User> {
    return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(this.auth, user => {
        unsub();
        if (user) resolve(user);
        else reject('Utilisateur non connecté');
      });
    });
  }

  // =========================
  // 🔐 LOGIN + ROLE
  // =========================
  async login(email: string, password: string): Promise<EmployeeProfile> {

    const cred = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const uid = cred.user.uid;

    // 🔎 ADMIN
    const adminSnap = await getDoc(
      doc(this.firestore, `users/${uid}`)
    );

    if (adminSnap.exists()) {
      return {
        id: uid,
        ...(adminSnap.data() as EmployeeProfile),
        role: 'ADMIN'
      };
    }

    // 🔎 EMPLOYEE
    const empSnap = await getDoc(
      doc(this.firestore, `employees/${uid}`)
    );

    if (empSnap.exists()) {
      return {
        id: uid,
        ...(empSnap.data() as EmployeeProfile)
      };
    }

    throw new Error('Utilisateur non trouvé');
  }

  // =========================
  // 🧾 CREATE USER
  // =========================
  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  // =========================
  // 🔁 PROFIL APRÈS REFRESH
  // =========================
  async getCurrentUserProfile(): Promise<EmployeeProfile> {

    const user = await this.waitForAuth();
    const uid = user.uid;

    // ADMIN
    const adminSnap = await getDoc(
      doc(this.firestore, `users/${uid}`)
    );

    if (adminSnap.exists()) {
      return {
        id: uid,
        ...(adminSnap.data() as EmployeeProfile),
        role: 'ADMIN'
      };
    }

    // EMPLOYEE
    const empSnap = await getDoc(
      doc(this.firestore, `employees/${uid}`)
    );

    if (empSnap.exists()) {
      return {
        id: uid,
        ...(empSnap.data() as EmployeeProfile)
      };
    }

    throw new Error('Profil introuvable');
  }

  // =========================
  // 🚪 LOGOUT
  // =========================
  logout() {
    return signOut(this.auth);
  }
}
