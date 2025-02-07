import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HeathCareComponent } from './component/heath-care/heath-care.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent },


  { path: 'details/:name', component: MainPageComponent },
  { path: 'health-care', component: HeathCareComponent },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
