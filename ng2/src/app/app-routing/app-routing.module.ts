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
import {DownloadComponent} from '../download/download.component';
import { DefaultPageComponent } from '../default-page/default-page.component';
import { SplashPageComponent } from '../splash-page/splash-page.component';
import { FormPageComponent } from '../form-page/form-page.component';

const appRoutes: Routes = [
  // Default page. TODO: Replace with page that simply checks for login token and directs from there
  { path: '', component: DefaultPageComponent },

  // Application pages
  { path: 'landing', component: SplashPageComponent},

  { path: 'empty-state', component: EmptyStateComponent, canActivate: [AuthGuard]},
  { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'status-board' , component: StatusBoardComponent, canActivate: [AuthGuard] },
  // TODO
  { path: 'tab-view', component: TabViewComponent},
  { path: 'list-view', component: ListViewComponent },
  { path: 'form-page', component: FormPageComponent},

  // Redirect invalid paths to default page
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
