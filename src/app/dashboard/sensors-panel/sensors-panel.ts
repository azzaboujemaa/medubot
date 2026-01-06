import { Component, OnInit, NgZone } from '@angular/core';
import { Database, ref, onValue, get } from '@angular/fire/database';

@Component({
  selector: 'app-sensors-panel',
  templateUrl: './sensors-panel.html',
  styleUrls: ['./sensors-panel.css']
})
export class SensorsPanelComponent implements OnInit {

  temperature: number | null = null;
  turbidityStatus: string = 'Chargement...';

  constructor(
    private db: Database,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.testFirebase();
    this.listenTemperature();
    this.listenTurbidity();
  }

  // 🧪 TEST DIRECT (une seule lecture)
  testFirebase(): void {
    const dbRef = ref(this.db, 'sensors/temperature');

    get(dbRef)
      .then(snapshot => {
        console.log('🧪 TEST SNAPSHOT =', snapshot.val());
      })
      .catch(err => {
        console.error('❌ Firebase error:', err);
      });
  }

  // 🌡️ TEMPÉRATURE (temps réel)
  listenTemperature(): void {
    const tempRef = ref(this.db, 'sensors/temperature');

    onValue(tempRef, snapshot => {
      if (!snapshot.exists()) {
        console.warn('⚠️ Temperature node not found');
        return;
      }

      const data = snapshot.val();
      console.log('🌡️ Temperature data =', data);

      this.zone.run(() => {
        this.temperature = data?.value ?? null;
      });
    });
  }

  // 💧 TURBIDITÉ (temps réel)
  listenTurbidity(): void {
    const turbRef = ref(this.db, 'sensors/turbidity');

    onValue(turbRef, snapshot => {
      if (!snapshot.exists()) {
        console.warn('⚠️ Turbidity node not found');
        return;
      }

      const data = snapshot.val();
      console.log('💧 Turbidity data =', data);

      this.zone.run(() => {
        this.turbidityStatus = data?.status ?? 'Inconnu';
      });
    });
  }
}
