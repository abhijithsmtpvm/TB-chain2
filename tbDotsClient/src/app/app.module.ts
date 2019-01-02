import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { VaccinationComponent } from './vaccination/vaccination.component';
import { LookupComponent } from './lookup/lookup.component';
import { DemoComponent } from './demo/demo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { BlockComponent } from './block/block.component';
import { PatientComponent } from './patient/patient.component';
import { VerifyComponent } from './verify/verify.component';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    EnrollComponent,
    VaccinationComponent,
    LookupComponent,
    DemoComponent,
    DashboardComponent,
    BlockComponent,
    PatientComponent,
    VerifyComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
