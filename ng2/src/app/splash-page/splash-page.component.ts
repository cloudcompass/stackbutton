import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {

  private showTitle: boolean;
  constructor(private router: Router) {
    this.showTitle = true;
  }

  ngOnInit() { }

  // Temporary
  internalPageClick() {
    this.router.navigate(['/internal-page']);
  }

  loginClick() {
    this.showTitle = false;
    this.router.navigate(['splash-page', {outlets: {'splash': 'login'}}]);
  }

  registrationClick() {
    this.showTitle = false;
    this.router.navigate(['splash-page', {outlets: {'splash': 'registration'}}]);
  }

  downloadClick() {
    this.showTitle = false;
    this.router.navigate(['splash-page', {outlets: {'splash': 'download'}}]);
  }
}
