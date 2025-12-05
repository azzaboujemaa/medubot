import { Component, OnInit } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { SensorGraphs } from './sensor-graphs/sensor-graphs';
import { MeduseHistory } from './meduse-history/meduse-history';
import { SummaryBar } from './summary-bar/summary-bar';
import { SystemEvents } from './system-events/system-events';

@Component({
  selector: 'app-history',
  imports: [ SummaryBar,
    MeduseHistory,
    SensorGraphs,
    SystemEvents],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
events: any[] = [];
  totalJellyfish = 0;
  avgTemp = 0;
  avgTurbidity = 0;
  gpsCount = 0;

  constructor(private db: Database) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    const historyRef = ref(this.db, 'history');

    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      this.events = Object.values(data);

      this.totalJellyfish = this.events.filter(e => e.type === 'jellyfish').length;
      this.avgTemp = this.average(this.events.filter(e => e.type === 'temp').map(e => e.value));
      this.avgTurbidity = this.average(this.events.filter(e => e.type === 'turbidity').map(e => e.value));
      this.gpsCount = this.events.filter(e => e.type === 'gps').length;
    });
  }

 average(arr: number[]): number {
  if (!arr.length) return 0;
  return parseFloat((arr.reduce((a, b) => a + b) / arr.length).toFixed(1));
}

}
