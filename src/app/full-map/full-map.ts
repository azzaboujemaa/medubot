import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-full-map',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './full-map.html',
  styleUrl: './full-map.css',
})
export class FullMap implements OnInit {

  private map: any;
  private robotMarker: any;
  private userMarker: any;

  private userLat: number | null = null;
  private userLon: number | null = null;

  private robotLat: number | null = null;
  private robotLon: number | null = null;

  private routeLine: any;
  navigationActive = false;

  ngOnInit() {
    this.initMap();
    this.trackRobot();
    this.trackUserPosition();
  }

  initMap() {
    this.map = L.map('fullmap', {
      center: [35.8256, 10.6084],
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = defaultIcon;

    this.robotMarker = L.marker([35.8256, 10.6084]).addTo(this.map);
    this.userMarker = L.marker([0, 0]).addTo(this.map);
    this.routeLine = L.polyline([], { color: 'blue', weight: 5 }).addTo(this.map);
  }

  trackRobot() {
    const db = getDatabase();
    const gpsRef = ref(db, 'medubot/gps');

    onValue(gpsRef, (snapshot) => {
      const gps = snapshot.val();
      if (!gps) return;

      this.robotLat = parseFloat(gps.lat);
      this.robotLon = parseFloat(gps.lon);

      this.robotMarker.setLatLng([this.robotLat, this.robotLon]);

      if (this.navigationActive) this.drawRoute();
    });
  }

  trackUserPosition() {
    if (!navigator.geolocation) return;

    navigator.geolocation.watchPosition((pos) => {
      this.userLat = pos.coords.latitude;
      this.userLon = pos.coords.longitude;

      this.userMarker.setLatLng([this.userLat, this.userLon]);

      if (this.navigationActive) this.drawRoute();
    });
  }

  async drawRoute() {
    if (!this.navigationActive ||
      !this.userLat || !this.userLon ||
      !this.robotLat || !this.robotLon) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${this.userLon},${this.userLat};${this.robotLon},${this.robotLat}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.routes || !data.routes[0]) return;

      const coords = data.routes[0].geometry.coordinates.map((c: any[]) => [c[1], c[0]]);

      this.routeLine.setLatLngs(coords);
      this.map.fitBounds(this.routeLine.getBounds());

    } catch (e) {
      console.error("OSRM error:", e);
    }
  }

  startNavigation() {
    this.navigationActive = true;
    console.log("Navigation Activated");
    this.drawRoute();
  }
}
