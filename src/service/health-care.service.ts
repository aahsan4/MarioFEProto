import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCareService {
  private baseUrl = 'http://localhost:3000/api/hospitals'; // Change if needed

  constructor(private http: HttpClient) { }

  // Get all hospitals
// In health-care.service.ts
getAllHospitals(searchTerm: string, zipCode: string, priceFilter: string = ''): Observable<any> {
  let searchParams = '';
  if (searchTerm || zipCode || priceFilter) {
    searchParams = `?name=${searchTerm}&procedure=${zipCode}&price=${priceFilter}`;
  }
  return this.http.get(`${this.baseUrl}${searchParams}`);
}


  // Get hospital by ID
  getHospitalById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new hospital
  createHospital(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Update hospital
  updateHospital(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete hospital
  deleteHospital(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
