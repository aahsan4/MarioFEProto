import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HeathCareComponent } from './component/heath-care/heath-care.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    LandingPageComponent,
    SignUpComponent,
    HeathCareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
