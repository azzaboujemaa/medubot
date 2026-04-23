import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-panel.html',
  styleUrls: ['./camera-panel.css']
})
export class CameraPanel {
  streamUrl = 'http://192.168.0.254:8000/stream.mjpg';
  isFullCameraOpen = false;

  openFullCamera() {
    this.isFullCameraOpen = true;
  }

  closeFullCamera() {
    this.isFullCameraOpen = false;
  }
}