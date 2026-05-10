import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Robot } from '../models/robot';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  firestore = inject(Firestore);

  robotsCollection = collection(
    this.firestore,
    'robots'
  );

  // GET ROBOTS
  getRobots(): Observable<Robot[]> {

    return collectionData(
      this.robotsCollection,
      { idField: 'firebaseId' }

    ) as Observable<Robot[]>;

  }
  // ==========================
// DELETE ROBOT
// ==========================
deleteRobot(docId: string) {

  const robotDoc = doc(
    this.firestore,
    `robots/${docId}`
  );

  return deleteDoc(robotDoc);

}

  // ADD ROBOT
  addRobot(robot: Robot) {

    return addDoc(
      this.robotsCollection,
      robot
    );

  }

}