import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://mariobackend-env.eba-eefm6dxx.us-east-2.elasticbeanstalk.com/api/users/signup'; // Adjust URL based on backend

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
