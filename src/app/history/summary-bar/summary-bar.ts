import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-bar',
  standalone: true,
  templateUrl: './summary-bar.html',
})
export class SummaryBar {
  @Input() totalJellyfish = 0;
  @Input() avgTemp = 0;
  @Input() avgTurbidity = 0;
}
