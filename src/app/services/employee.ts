import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import {
  Auth,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { EmployeeProfile } from '../models/employee-profile';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // ✅ Attendre que Firebase restaure la session
  private waitForAuth(): Promise<User> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        unsubscribe();
        if (user) resolve(user);
        else reject('Utilisateur non connecté');
      });
    });
  }

  // 🔹 PROFIL UNIVERSEL (ADMIN / EMPLOYEE)
  async getMyProfileUniversal(): Promise<EmployeeProfile> {

    // ⏳ attendre Firebase
    const user = await this.waitForAuth();
    const uid = user.uid;

    // 🔍 ADMIN
    const adminSnap = await getDoc(doc(this.firestore, `users/${uid}`));
    if (adminSnap.exists()) {
      return {
        id: uid,
        ...(adminSnap.data() as EmployeeProfile)
      };
    }

    // 🔍 EMPLOYEE
    const empSnap = await getDoc(doc(this.firestore, `employees/${uid}`));
    if (empSnap.exists()) {
      return {
        id: uid,
        ...(empSnap.data() as EmployeeProfile)
      };
    }

    throw new Error('Profil introuvable');
  }

  // 🔹 Modifier SEULEMENT robot + zone
  async updateMyProfile(robotId: string, zone: string) {
    const user = await this.waitForAuth();

    const ref = doc(this.firestore, `employees/${user.uid}`);
    return updateDoc(ref, { robotId, zone });
  }
}
