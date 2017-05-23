import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard'; // For preventing un-authorized access to pages
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StatusBoardComponent } from '../status-board/status-board.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ListViewComponent } from '../list-view/list-view.component';
import { TabViewComponent } from '../tab-view/tab-view.component';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { DefaultPageComponent } from '../default-page/default-page.component';

const appRoutes: Routes = [
  // Default page. TODO: Replace with page that simply checks for login token and directs from there
  { path: '', component: DefaultPageComponent },

  // Application pages
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'empty-state', component: EmptyStateComponent},
  { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'status-board' , component: StatusBoardComponent, canActivate: [AuthGuard] },
  { path: 'getting-started' , component: GettingStartedComponent, canActivate: [AuthGuard] },

  // TODO
  { path: 'tab-view', component: TabViewComponent},
  { path: 'list-view', component: ListViewComponent },

  // Redirect invalid paths to default page
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
