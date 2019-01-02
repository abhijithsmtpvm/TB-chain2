import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { VerifyComponent } from './verify/verify.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'enroll',
        component: EnrollComponent
      },
    ]
  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  // CommonModule

  declarations: []
})
export class AppRoutingModule { }
