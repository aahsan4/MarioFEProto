import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.loginService.login(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // Store JWT token
        this.router.navigate(['/']); // Redirect to home page
      },
      (error) => {
        this.errorMessage = error.error.message || 'Invalid login credentials';
      }
    );
  }
}
