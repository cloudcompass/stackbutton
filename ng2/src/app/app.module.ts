import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app-routing/app-routing.module';
import { AuthGuard } from './_guards/auth.guard';

// Used exclusively for routing
import { DefaultPageComponent } from './default-page/default-page.component';

// Splash Page components
import { SplashPageComponent } from './splash-page/splash-page.component';
import { SplashTitleCardComponent } from './splash-title-card/splash-title-card.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DownloadComponent } from './download/download.component';

// Internal Page components
import { InternalPageComponent } from './internal-page/internal-page.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DataSourceEditorComponent } from './data-source-editor/data-source-editor.component';
import { DataSourceManageComponent } from './data-source-manage/data-source-manage.component';
import { DataSourceAddComponent } from './data-source-add/data-source-add.component';

// Status-board components
import { NavigationComponent } from './navigation/navigation.component';
import { TrendCardComponent } from './trend-card/trend-card.component';
import { UtilizationCardComponent } from './utilization-card/utilization-card.component';
import { ListViewComponent} from './list-view/list-view.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { CommitCardComponent } from './commits-card/commits-card.component';
import { IssuesCardComponent } from './issues-card/issues-card.component';

// Services
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { GithubService } from './_services/github.service';
import { GithubUserService } from './_services/github-user.service';
import { GithubIssuesService } from './_services/github-issues.service';
import { GithubCommitsService } from './_services/github-commits.service';
import { OpenShiftService } from './_services/openshift.service';

// Used to create fake backend, to be removed
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// TODO: Is this necessary now?
import * as $ from 'jquery';
import { OpenshiftPodCardComponent } from './openshift-pod-card/openshift-pod-card.component';
import { OpenshiftProjectCardComponent } from './openshift-project-card/openshift-project-card.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    EmptyStateComponent,
    TrendCardComponent,
    UtilizationCardComponent,
    ListViewComponent,
    StatusBoardComponent,
    TabViewComponent,
    CommitCardComponent,
    IssuesCardComponent,
    SplashPageComponent,
    DownloadComponent,
    DefaultPageComponent,
    InternalPageComponent,
    SplashTitleCardComponent,
    ProfilePageComponent,
    DataSourceEditorComponent,
    DataSourceManageComponent,
    DataSourceAddComponent,
    OpenshiftPodCardComponent,
    OpenshiftProjectCardComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    GithubService,
    GithubUserService,
    GithubIssuesService,
    GithubCommitsService,

    // Testing
    OpenShiftService,

    // Used to create fake backend, to be removed
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
