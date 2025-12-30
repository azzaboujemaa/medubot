import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeachService {

  private apiUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getBeachesTunisia(): Observable<any> {

    const query = `
      [out:json];
      area["ISO3166-1"="TN"][admin_level=2]->.tunisia;
      (
        node["natural"="beach"](area.tunisia);
        way["natural"="beach"](area.tunisia);
      );
      out tags;
    `;

    return this.http.post(this.apiUrl, query, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
