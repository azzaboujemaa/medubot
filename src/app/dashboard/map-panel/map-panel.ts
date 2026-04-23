import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { getDatabase, ref, onValue } from '@angular/fire/database';

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
  imports: [CommonModule],
  templateUrl: './map-panel.html',
  styleUrls: ['./map-panel.css'],
})
export class MapPanel implements OnInit, AfterViewChecked {

  private map!: L.Map;
  private marker!: L.Marker;

  private fullMap!: L.Map;
  private fullMarker!: L.Marker;
  private fullMapCreated = false;

  isFullMapOpen = false;

  currentLat = 35.8256;
  currentLon = 10.6084;

  ngOnInit(): void {
    this.initMap();
    this.listenToGPS();
  }

  ngAfterViewChecked(): void {
    if (this.isFullMapOpen && !this.fullMapCreated) {
      this.initFullMap();
      this.fullMapCreated = true;
    }
  }

  openFullMap(): void {
    this.isFullMapOpen = true;
  }

  closeFullMap(): void {
    this.isFullMapOpen = false;

    if (this.fullMap) {
      this.fullMap.remove();
      this.fullMapCreated = false;
    }
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [this.currentLat, this.currentLon],
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.marker = L.marker([this.currentLat, this.currentLon]).addTo(this.map);
  }

  initFullMap(): void {
    this.fullMap = L.map('full-map-modal', {
      center: [this.currentLat, this.currentLon],
      zoom: 16
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.fullMap);

    this.fullMarker = L.marker([this.currentLat, this.currentLon]).addTo(this.fullMap);

    setTimeout(() => {
      this.fullMap.invalidateSize();
    }, 300);
  }

  listenToGPS(): void {
    const db = getDatabase();
    const gpsRef = ref(db, 'sensors/gps');

    onValue(gpsRef, (snapshot) => {
      const gps = snapshot.val();
      if (!gps) return;

      const lat = Number(gps.lat);
      const lon = Number(gps.lon);

      if (isNaN(lat) || isNaN(lon)) return;

      this.currentLat = lat;
      this.currentLon = lon;

      if (this.marker && this.map) {
        this.marker.setLatLng([lat, lon]);
        this.map.setView([lat, lon], 16);
      }

      if (this.fullMarker && this.fullMap) {
        this.fullMarker.setLatLng([lat, lon]);
        this.fullMap.setView([lat, lon], 16);
      }
    });
  }
}