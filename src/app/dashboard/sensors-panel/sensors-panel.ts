import { Component, OnInit, NgZone } from '@angular/core';
import { Database, ref, onValue, get } from '@angular/fire/database';

@Component({
  selector: 'app-sensors-panel',
  templateUrl: './sensors-panel.html',
  styleUrls: ['./sensors-panel.css']
})
export class SensorsPanelComponent implements OnInit {

  temperature: number = 0;

  constructor(
    private db: Database,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.testFirebase();       // test direct
    this.loadTemperature();    // écoute temps réel
  }

  // 🔥 Test direct Firebase (pour debug)
  testFirebase() {
    const dbRef = ref(this.db, 'temperature/value');

    get(dbRef)
      .then(snapshot => {
        console.log("🔥 TEST LECTURE DIRECTE =", snapshot.val());
      })
      .catch(err => {
        console.error("❌ Erreur Firebase :", err);
      });
  }

  // 🔥 Lecture en temps réel
  loadTemperature() {
    const tempRef = ref(this.db, 'temperature/value');

    onValue(tempRef, (snapshot) => {
      const value = snapshot.val();

      console.log("🔥 Température en temps réel =", value);

      if (value !== null && value !== undefined) {
        this.zone.run(() => {
          this.temperature = value;
        });
      }
    });
  }
}
