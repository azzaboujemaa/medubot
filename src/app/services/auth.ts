import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
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
  // 🔐 LOGIN + ROLE
  // =========================
  async login(email: string, password: string): Promise<EmployeeProfile> {

    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    // 🔎 ADMIN
    const adminRef = doc(this.firestore, `users/${uid}`);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      return {
        id: uid,
        ...(adminSnap.data() as EmployeeProfile),
        role: 'ADMIN'
      };
    }

    // 🔎 EMPLOYEE / OPERATOR / MAINTENANCE
    const empRef = doc(this.firestore, `employees/${uid}`);
    const empSnap = await getDoc(empRef);

    if (empSnap.exists()) {
      return {
        id: uid,
        ...(empSnap.data() as EmployeeProfile)
      };
    }

    throw new Error('Utilisateur non trouvé');
  }

  // =========================
  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // =========================
  logout() {
    return signOut(this.auth);
  }
}
