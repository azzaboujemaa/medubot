import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sensor-graphs',
  standalone: true,
  templateUrl: './sensor-graphs.html'
})
export class SensorGraphs implements AfterViewInit {

  ngAfterViewInit() {
    this.createTemperatureGraph();
    this.createTurbidityGraph();
  }

  createTemperatureGraph() {
    new Chart("tempChart", {
      type: 'line',
      data: {
        labels: ['12h', '13h', '14h', '15h'],
        datasets: [{
          label: 'Température (°C)',
          data: [18.2, 18.4, 18.7, 19.1],
          borderColor: '#4BA3FF',
          tension: 0.3
        }]
      }
    });
  }

  createTurbidityGraph() {
    new Chart("turbChart", {
      type: 'line',
      data: {
        labels: ['12h', '13h', '14h', '15h'],
        datasets: [{
          label: 'Turbidité (NTU)',
          data: [22, 23, 24, 26],
          borderColor: '#FFD93D',
          tension: 0.3
        }]
      }
    });
  }
}
