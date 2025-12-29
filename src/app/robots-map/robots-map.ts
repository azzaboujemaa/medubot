import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-robots-map',
  standalone: true,
  templateUrl: './robots-map.html',
  styleUrls: ['./robots-map.css']
})
export class RobotsMap implements AfterViewInit {

  private map!: L.Map;

  // 🔹 Liste des robots (plus tard → Firebase)
  robots = [
    {
      name: 'MeduBot A01',
      zone: 'Sousse Nord',
      status: 'En mission',
      lat: 35.8326,
      lng: 10.6380
    },
    {
      name: 'MeduBot A02',
      zone: 'Port El Kantaoui',
      status: 'En panne',
      lat: 35.8924,
      lng: 10.5951
    },
    {
      name: 'MeduBot B01',
      zone: 'Monastir',
      status: 'Alerte',
      lat: 35.7770,
      lng: 10.8262
    }
  ];

  ngAfterViewInit(): void {
    this.initMap();
    this.addRobotsMarkers();
  }

  private initMap(): void {
    this.map = L.map('robotsMap', {
      center: [35.7, 10.7], // Tunisie
      zoom: 8
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private addRobotsMarkers(): void {
    this.robots.forEach(robot => {
      L.marker([robot.lat, robot.lng])
        .addTo(this.map)
        .bindPopup(`
          <strong>${robot.name}</strong><br>
          📍 ${robot.zone}<br>
          ⚙️ ${robot.status}
        `);
    });
  }
}
