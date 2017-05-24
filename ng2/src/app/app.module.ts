import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Used to create fake backend, to be removed
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app-routing/app-routing.module';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

// "Single Page" components
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { DefaultPageComponent } from './default-page/default-page.component';

// Actual components
import { HorizontalNavigationComponent } from './horizontal-navigation/horizontal-navigation.component';
import { TrendCardComponent } from './trend-card/trend-card.component';
import { UtilizationBarComponent } from './utilization-bar/utilization-bar.component';
import { ListViewComponent} from './list-view/list-view.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { CommitWidgetComponent } from './commits-widget/commits-widget.component';
import { IssuesWidgetComponent } from './issues-widget/issues-widget.component';

// Services
import { GithubService } from './_services/github.service';
import { GithubUserService } from './_services/github-user.service';
import { GithubIssuesService } from './_services/github-issues.service';
import { GithubCommitsService } from './_services/github-commits.service';

import * as $ from 'jquery';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { DownloadComponent } from './download/download.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    HorizontalNavigationComponent,
    EmptyStateComponent,
    TrendCardComponent,
    UtilizationBarComponent,
    ListViewComponent,
    StatusBoardComponent,
    ToolbarComponent,
    TabViewComponent,
    CommitWidgetComponent,
    IssuesWidgetComponent,
    SplashPageComponent,
    DownloadComponent,
    GettingStartedComponent,
    DefaultPageComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,

    // Used to create fake backend, to be removed
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,

    // Github Services
    GithubService,
    GithubUserService,
    GithubIssuesService,
    GithubCommitsService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
