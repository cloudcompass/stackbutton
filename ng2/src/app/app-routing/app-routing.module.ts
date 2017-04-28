import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DashboardComponent } from "../dashboard/dashboard.component";

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Otherwise redirect to landing
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
