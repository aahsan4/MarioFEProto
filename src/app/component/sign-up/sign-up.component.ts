import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../../service/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = {
    email: '',
    phone: '',
    password: '',
    age: null,
    gender: '',
    deductible: null,
    outOfPocket: null,
    healthSpending: null,
    fsaHsa: null,
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private signupService: SignupService,private router: Router) {}

  ngOnInit(): void {}

  addUser(): void {
    this.signupService.signup(this.user).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = error.error.message || 'An error occurred';
      }
    );
  }
}
