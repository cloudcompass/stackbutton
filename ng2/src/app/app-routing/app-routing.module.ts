import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../registration/registration.component';
import { AuthGuard } from '../_guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
