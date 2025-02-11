import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostplusdrugsService } from '../../../service/costplusdrugs.service';
import { LoginService } from '../../../service/login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  drugs: any[] = [];
  selectedDrug: any = null;
  user: any = null;
  mario_price: number = 0;
  saving: number = 0;
  retail_price: number = 0;
  cost_price: number = 0;
  searchQuery: string = '';

  searchResults: any[] = [];



  constructor(
    private route: ActivatedRoute,
    private costplusdrugsService: CostplusdrugsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.costplusdrugsService.getDrugsData().subscribe((data) => {
      this.drugs = data;
      const drugName = this.route.snapshot.paramMap.get('name');
      this.selectedDrug = this.drugs.find(drug => drug.name === drugName);

      if (this.selectedDrug) {
        const costPriceString = this.selectedDrug.marioprice?.toString().replace(/[^0-9.]/g, '') || '0';
        this.cost_price = Number(costPriceString);

        const retailPriceString = this.selectedDrug.mrp?.toString().replace(/[^0-9.]/g, '') || '0';
        this.retail_price = Number(retailPriceString);

        console.log('cost_price:', this.cost_price);
        console.log('retail_price:', this.retail_price);

        if (this.user) {
          console.log('health:', this.user.healthSpending);
          console.log('deductible:', this.user.deductible);
          console.log('mrp:', this.selectedDrug.mrp);

          const mrp = Number(retailPriceString);

          // Calculation logic
          const difference = this.user.deductible - this.user.healthSpending;
          this.mario_price = difference > 0 ? difference + 5 : 5;

          // Calculate saving
          this.saving = mrp - this.mario_price;

          console.log('mario_price:', this.mario_price);
          console.log('saving:', this.saving);
        }
        if (this.selectedDrug && this.user) {
          console.log('health:', this.user.healthSpending);
          console.log('deductible:', this.user.deductible);
          console.log('mrp:', this.selectedDrug.mrp);

          const mrp = Number(retailPriceString);

          // Calculation logic
          const difference = this.user.deductible - this.user.healthSpending;
          this.mario_price = difference > 0 ? difference + 5 : 5;

          // Calculate saving
          this.saving = mrp - this.mario_price;

          console.log('mario_price:', this.mario_price);
          console.log('saving:', this.saving);
        }
      }
    });

    this.loginService.user$.subscribe(user => {
      this.user = user;
    });

    console.log('cost_price:', this.cost_price);
    console.log('retail_price:', this.retail_price);
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

