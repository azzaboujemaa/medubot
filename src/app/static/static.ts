import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './static.html',
  styleUrls: ['./static.css']
})
export class Static implements OnInit {
  jellyfishCount = 0;
  turtlesProtected = 0;
  zonesCleaned = 0;
  fertilizerProduced = 0;

  ngOnInit() {
    this.animateStats();
  }

  animateStats() {
    const duration = 2000; // 2 secondes
    const frameRate = 30;
    const steps = duration / (1000 / frameRate);

    const targets = {
      jellyfishCount: 1200,
      turtlesProtected: 85,
      zonesCleaned: 12,
      fertilizerProduced: 230
    };

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      this.jellyfishCount = Math.floor(targets.jellyfishCount * currentStep / steps);
      this.turtlesProtected = Math.floor(targets.turtlesProtected * currentStep / steps);
      this.zonesCleaned = Math.floor(targets.zonesCleaned * currentStep / steps);
      this.fertilizerProduced = Math.floor(targets.fertilizerProduced * currentStep / steps);

      if (currentStep >= steps) {
        clearInterval(interval);
        this.jellyfishCount = targets.jellyfishCount;
        this.turtlesProtected = targets.turtlesProtected;
        this.zonesCleaned = targets.zonesCleaned;
        this.fertilizerProduced = targets.fertilizerProduced;
      }
    }, 1000 / frameRate);
  }
}
