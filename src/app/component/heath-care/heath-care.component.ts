import { Component, OnInit } from '@angular/core';
import { HealthCareService } from '../../../service/health-care.service';  // Import the HealthCareService
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heath-care',
  templateUrl: './heath-care.component.html',
  styleUrls: ['./heath-care.component.scss']
})
export class HeathCareComponent implements OnInit {

  user: any = null;
  hospitals: any[] = [];
  searchName: string = '';
  searchProcedure: string = '';

  constructor(
    private healthCareService: HealthCareService,  // Inject the service
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchHospitals();  // Fetch all hospitals initially
  }

  // Logout method
  logout(): void {
    this.loginService.logout();
  }

  // Method to fetch hospitals with optional search parameters
  fetchHospitals(): void {
    this.healthCareService.getAllHospitals(this.searchName, this.searchProcedure).subscribe(
      (data) => {
        this.hospitals = data;
      },
      (error) => {
        console.error('Error fetching hospitals:', error);
      }
    );
  }

  // Trigger search when the user clicks the search button
  onSearch(): void {
    this.fetchHospitals();
  }

}
