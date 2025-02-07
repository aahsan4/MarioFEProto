import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { CostplusdrugsService } from '../../../service/costplusdrugs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  drugs: any[] = [];
  searchResults: any[] = [];
  searchQuery: string = '';
  selectedDrug: any = null;
  user: any = null; // Store logged-in user data

  constructor(
    private costplusdrugsService: CostplusdrugsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch drugs data
    this.costplusdrugsService.getDrugsData().subscribe((data) => {
      this.drugs = data;
    });

    // Subscribe to user data
    this.loginService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.drugs.filter(drug =>
      drug.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectDrug(drug: any): void {
    this.searchQuery = drug.name;
    this.selectedDrug = drug;
    this.searchResults = [];
  }

  searchDrug(): void {
    if (this.selectedDrug) {
      this.router.navigate(['/details', this.selectedDrug.name]);
    }
  }

  logout(): void {
    this.loginService.logout();
  }
}
