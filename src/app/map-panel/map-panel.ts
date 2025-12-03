import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { RouterLink } from '@angular/router';

// Correction de l'icône Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-map-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './map-panel.html',
  styleUrl: './map-panel.css',
})
export class MapPanel implements OnInit {

  private map: any;
  private marker: any;

  ngOnInit() {
    this.initMap();
    this.listenToGPS();
  }

  initMap() {
    this.map = L.map('map', {
      center: [35.8256, 10.6084], // Sousse default
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.marker = L.marker([35.8256, 10.6084]).addTo(this.map);
  }

  listenToGPS() {
    const db = getDatabase();
    const gpsRef = ref(db, 'medubot/gps');

    onValue(gpsRef, (snapshot) => {
      const gps = snapshot.val();
      if (!gps) return;

      const lat = gps.lat;
      const lon = gps.lon;

      this.marker.setLatLng([lat, lon]);
      this.map.setView([lat, lon], 16);
    });
  }

}
