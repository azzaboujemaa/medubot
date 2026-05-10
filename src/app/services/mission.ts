import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore'
import { serverTimestamp } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class Mission {

  private firestore = inject(Firestore);
  private missionsRef = collection(this.firestore, 'mission');

  addMission(mission: any) {
    return addDoc(this.missionsRef, {
      ...mission,
      status:    'ACTIVE',
      endDate:   null,
      createdAt: serverTimestamp()
    });
  }

  getMissions() {
    return collectionData(this.missionsRef, { idField: 'docId' }); // ✅ même collection
  }

  deleteMission(docId: string) {
    return deleteDoc(doc(this.firestore, `mission/${docId}`)); // ✅ même collection
  }
}