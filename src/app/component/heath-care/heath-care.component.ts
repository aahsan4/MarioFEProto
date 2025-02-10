import { Component, OnInit } from '@angular/core';
import { HealthCareService } from '../../../service/health-care.service';
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
  filteredHospitals: any[] = [];
  suggestions: string[] = [];

  constructor(
    private healthCareService: HealthCareService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.user$.subscribe(user => {
      this.user = user;
    });

    this.fetchHospitals(); // Fetch hospital data on component load
  }

  // Fetch hospitals from service
  fetchHospitals(): void {
    this.healthCareService.getHospitals().subscribe(data => {
      this.hospitals = data;
      this.filteredHospitals = [...this.hospitals]; // Show all hospitals by default
    });
  }

  // Search functionality
  onSearch(): void {
    this.filteredHospitals = this.hospitals.filter(hospital =>
      (!this.searchName || hospital.Name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (!this.searchProcedure || hospital.Category.toLowerCase().includes(this.searchProcedure.toLowerCase()))
    );
  }

  // Show suggestions as user types
  onSearchInputChange(): void {
    if (!this.hospitals.length) return;

    this.suggestions = this.hospitals
      .map(hospital => hospital.Name)
      .filter((name, index, self) =>
        self.indexOf(name) === index && name.toLowerCase().includes(this.searchName.toLowerCase())
      );
  }

  // Function to handle suggestion selection
selectSuggestion(suggestion: string): void {
  this.searchName = suggestion;
  this.suggestions = []; // Clear suggestions after selection
}


  // Logout user
  logout(): void {
    this.loginService.logout();
  }
}
