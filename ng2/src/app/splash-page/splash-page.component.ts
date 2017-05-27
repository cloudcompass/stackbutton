import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashTitleCardComponent } from '../splash-title-card/splash-title-card.component';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Default to showing the splash-title-card component
    this.router.navigate([{outlets: {splash: ['SplashTitleCardComponent']}}]);
  }
}
