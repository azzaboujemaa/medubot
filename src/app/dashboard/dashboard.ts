import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RobotCard } from "../robot-card/robot-card";
import { SensorsPanel } from "../sensors-panel/sensors-panel";
import { CameraPanel } from "../camera-panel/camera-panel";
import { MapPanel } from "../map-panel/map-panel";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, RobotCard, SensorsPanel, CameraPanel, MapPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
