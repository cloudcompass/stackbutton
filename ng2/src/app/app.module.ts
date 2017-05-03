import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavVerticalComponent } from './nav-vertical/nav-vertical.component';
import { NavHorizontalComponent } from './nav-horizontal/nav-horizontal.component';
import { BlankStateComponent } from './blank-state/blank-state.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavVerticalComponent,
    NavHorizontalComponent,
    BlankStateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
