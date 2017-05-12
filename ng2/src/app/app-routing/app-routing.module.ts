import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import { StatusBoardComponent } from '../status-board/status-board.component';
import { ListViewComponent} from '../list-view/list-view.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { TabViewComponent} from '../tab-view/tab-view.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },

  // StatusBoard is a temporary replacement for DashBoard
  // { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'status-board' ,
    component: StatusBoardComponent,
    canActivate: [AuthGuard] },

  { path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'list-view',
    component: ListViewComponent
  },

  {
    path: 'empty-state',
    component: EmptyStateComponent
  },
  {
    // TODO
    path: 'tab-view',
    component: TabViewComponent
  },
  // Otherwise redirect to landing
  { path: '**',
    redirectTo: ''
  }
];



export const routing = RouterModule.forRoot(appRoutes);
