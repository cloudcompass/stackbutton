import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {

  private showSplash: boolean;
  private showLogin: boolean;
  private showRegistration: boolean;
  private showDownload: boolean;
  constructor() {
    this.showSplash = true;
    this.showLogin = false;
    this.showRegistration = false;
    this.showDownload = false;
  }

  ngOnInit() {
  }


  loginClick() {
    this.showSplash = false;
    this.showLogin = true;
    this.showRegistration = false;
    this.showDownload = false;

  }

  registrationClick() {
    this.showSplash = false;
    this.showLogin = false;
    this.showRegistration = true;
    this.showDownload = false;
  }
  downloadClick() {
    this.showSplash = false;
    this.showLogin = false;
    this.showRegistration = false;
    this.showDownload = true;
  }
}
