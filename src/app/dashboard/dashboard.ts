import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RobotCard } from "../robot-card/robot-card";
import { SensorsPanelComponent } from "../sensors-panel/sensors-panel";
import { CameraPanel } from "../camera-panel/camera-panel";
import { MapPanel } from "../map-panel/map-panel";
import { WeatherPanelComponent } from "../weather-panel/weather-panel";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, RobotCard, SensorsPanelComponent, CameraPanel, MapPanel, WeatherPanelComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
