import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostplusdrugsService } from '../../../service/costplusdrugs.service';
import { LoginService } from '../../../service/login.service';


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
  saving: number = 0; // Define the saving variable

  constructor(
    private route: ActivatedRoute,
    private costplusdrugsService: CostplusdrugsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.costplusdrugsService.getDrugsData().subscribe((data) => {
      this.drugs = data;
      const drugName = this.route.snapshot.paramMap.get('name');
      this.selectedDrug = this.drugs.find(drug => drug.name === drugName);

      if (this.selectedDrug && this.user) {
        console.log('health:', this.user.healthSpending);
        console.log('deductible:', this.user.deductible);
        console.log('mrp:', this.selectedDrug.mrp);

        const mrpString = this.selectedDrug.mrp.toString().replace(/[^0-9.]/g, ''); // Remove $ and non-numeric characters
        const mrp = Number(mrpString) || 0; // Convert to number safely

        console.log(mrp);



        // Calculation logic
        const difference = this.user.deductible - this.user.healthSpending;
        this.mario_price = difference > 0 ? difference + 5 : 5;

        // Calculate saving
        this.saving = mrp - this.mario_price;

        console.log('mario_price:', this.mario_price);
        console.log('saving:', this.saving);
      }

    });

    this.loginService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}

