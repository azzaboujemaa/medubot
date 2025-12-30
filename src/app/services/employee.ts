import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { EmployeeProfile } from '../models/employee-profile';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // 🔹 Récupérer le profil employee connecté
   async getMyProfileUniversal(): Promise<EmployeeProfile> {
  const user = this.auth.currentUser;
  if (!user) {
    throw new Error('Utilisateur non connecté');
  }

  const uid = user.uid;

  // 🔍 chercher dans users (ADMIN)
  const adminRef = doc(this.firestore, `users/${uid}`);
  const adminSnap = await getDoc(adminRef);

  if (adminSnap.exists()) {
    return {
      id: uid,
      ...(adminSnap.data() as EmployeeProfile)
    };
  }

  // 🔍 chercher dans employees
  const empRef = doc(this.firestore, `employees/${uid}`);
  const empSnap = await getDoc(empRef);

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
    const user = this.auth.currentUser;
    if (!user) throw new Error('Utilisateur non connecté');

    const ref = doc(this.firestore, `employees/${user.uid}`);

    return updateDoc(ref, {
      robotId,
      zone
    });
  }
}
