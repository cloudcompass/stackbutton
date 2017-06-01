import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard'; // For preventing un-authorized access to pages

// Splash page components
import { SplashPageComponent } from '../splash-page/splash-page.component';
import { SplashTitleCardComponent } from '../splash-title-card/splash-title-card.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DownloadComponent } from '../download/download.component';

// Internal page components
import { InternalPageComponent } from '../internal-page/internal-page.component';
import { StatusBoardComponent } from '../status-board/status-board.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DefaultPageComponent } from '../default-page/default-page.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { DataSourceEditorComponent } from '../data-source-editor/data-source-editor.component';
import { DataSourceManageComponent } from '../data-source-manage/data-source-manage.component';

// TODO: Necessary internal components?
import { ListViewComponent } from '../list-view/list-view.component';
import { TabViewComponent } from '../tab-view/tab-view.component';

const appRoutes: Routes = [
  { path: '', component: DefaultPageComponent },

  // Setup 'splash-page' routing and routing for it's nested router: 'splash'
  {
    path: 'splash-page',
    component: SplashPageComponent,
    children: [
      {
        path: '',
        component: SplashTitleCardComponent,
        outlet: 'splash'
      },
      {
        path: 'login',
        component: LoginComponent,
        outlet: 'splash'
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        outlet: 'splash'
      },
      {
        path: 'download',
        component: DownloadComponent,
        outlet: 'splash'
      },
    ]
  },
  // Setup 'internal-page' routing and routing for it's nested router: 'internal'
  {
    path: 'internal-page',
    component: InternalPageComponent,
    canActivate: [AuthGuard],
    children: [
      /*
      TODO: Figure out appropriate routing for just straight-up /internal-page. Status-board should be default.
      {
        path: '',
        redirectTo: 'status-board',
        pathMatch: 'full'
      }
      */
      {
        path: 'status-board',
        component: StatusBoardComponent,
        outlet: 'internal'
      },
      {
        path: 'empty-state',
        component: EmptyStateComponent,
        outlet: 'internal'
      },
      {
        path: 'data-source-manage',
        component: DataSourceManageComponent,
        outlet: 'internal'
      },
      {
        path: 'data-source-editor',
        component: DataSourceEditorComponent,
        outlet: 'internal'
      },
      {
        path: 'profile-page',
        component: ProfilePageComponent,
        outlet: 'internal'
      }
    ]
  },

  // Redirect invalid paths to default page
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
