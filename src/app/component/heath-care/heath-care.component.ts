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
  procedureSuggestions: string[] = [];
  selectedProcedure: any = null;

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
    if (!this.searchName.trim()) {
      this.suggestions = []; // Clear suggestions if input is empty
      return;
    }

    // Clear procedure input when name is being typed
    this.searchProcedure = '';
    this.procedureSuggestions = [];

    if (!this.hospitals.length) return;

    this.suggestions = this.hospitals
      .map(hospital => hospital.Name)
      .filter((name, index, self) =>
        self.indexOf(name) === index && name.toLowerCase().includes(this.searchName.toLowerCase())
      );
  }

  // Select a name suggestion
  selectSuggestion(suggestion: string): void {
    this.searchName = suggestion;
    this.suggestions = []; // Clear suggestions after selection
  }

  // Show procedure suggestions as user types
  onProcedureInputChange(): void {
    if (!this.searchProcedure.trim()) {
      this.procedureSuggestions = []; // Clear procedure suggestions if input is empty
      return;
    }

    // Clear name input when procedure is being typed
    this.searchName = '';
    this.suggestions = [];

    if (!this.hospitals.length) return;

    this.procedureSuggestions = this.hospitals
      .map(hospital => hospital.Category)
      .filter((category, index, self) =>
        self.indexOf(category) === index && category.toLowerCase().includes(this.searchProcedure.toLowerCase())
      );
  }

  // Select a procedure suggestion
  selectProcedureSuggestion(procedure: string): void {
    this.searchProcedure = procedure;
    this.procedureSuggestions = []; // Clear suggestions after selection
    this.selectedProcedure = this.hospitals.find(hospital => hospital.Category === procedure);
  }

  // Clear all suggestions
  clearSuggestions(): void {
    this.suggestions = [];
  }

  // Clear procedure suggestions
  clearProcedureSuggestions(): void {
    this.procedureSuggestions = [];
  }

  // Logout user
  logout(): void {
    this.loginService.logout();
  }
}
