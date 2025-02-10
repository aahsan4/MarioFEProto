import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCareService {

  private jsonUrl = 'assets/turquoise_test.json'; // Make sure this file exists

  constructor(private http: HttpClient) {}

  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl); // JSON files don't support query params
  }
}
