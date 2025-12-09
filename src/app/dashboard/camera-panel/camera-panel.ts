import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-camera-panel',
  standalone: true,
  templateUrl: './camera-panel.html',
  styleUrls: ['./camera-panel.css']
})
export class CameraPanel implements AfterViewInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  streamUrl = "http://192.168.0.254:8888/mystream/index.m3u8";

  ngAfterViewInit() {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.streamUrl);
      hls.attachMedia(this.video.nativeElement);
    } else {
      this.video.nativeElement.src = this.streamUrl;
    }
  }
}
