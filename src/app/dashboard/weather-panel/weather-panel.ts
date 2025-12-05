import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.html',
  styleUrls: ['./weather-panel.css']
})
export class WeatherPanelComponent implements OnInit {

  temp: number = 0;
  date: string = "";
  time: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadWeather();
    setInterval(() => this.loadWeather(), 60000);
  }

  loadWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=35.8256&longitude=10.63699&current_weather=true&timezone=Africa%2FTunis";

    this.http.get<any>(url).subscribe(data => {
      this.temp = Math.round(data.current_weather.temperature);

      const datetime = new Date(data.current_weather.time);

      this.date = datetime.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      this.time = datetime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    });
  }
}
