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
import { GithubUserService } from './_services/github-user.service';
import { GithubIssuesService } from './_services/github-issues.service';
import { GithubCommitsService } from './_services/github-commits.service';
import { GithubProjectService } from './_services/github-project.service';
import { OpenShiftService } from './_services/openshift.service';
import { DataSourceService } from './_services/data-source.service';


// Used to create fake backend, to be removed
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// TODO: Is this necessary now?
import * as $ from 'jquery';

import { OpenshiftProjectCardComponent } from './openshift-project-card/openshift-project-card.component';
import { OpenshiftPodComponent } from './openshift-pod/openshift-pod.component';
import { OpenshiftRouteComponent } from './openshift-route/openshift-route.component';
import { OpenshiftServiceComponent } from './openshift-service/openshift-service.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DemoBoardComponent } from './demo-board/demo-board.component';
import { DataSourceViewComponent } from './data-source-view/data-source-view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
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
    OpenshiftProjectCardComponent,
    OpenshiftPodComponent,
    OpenshiftRouteComponent,
    OpenshiftServiceComponent,
    DemoBoardComponent,
    DataSourceViewComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    GithubUserService,
    GithubIssuesService,
    GithubCommitsService,
    GithubProjectService,
    OpenShiftService,
    DataSourceService,

    // Used to create fake backend, to be removed
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
