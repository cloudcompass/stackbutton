import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})

/**
 * DefaultPageComponent simply acts as the initial entry point of the application.
 * It then routes the user to the appropriate page based on being logged in or not
 */
export class DefaultPageComponent implements OnInit {

  constructor(private router: Router) {
    // Check for a logged in user, then redirect them
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(['/splash-page']);
    }
    else {
      this.router.navigate(['/internal-page', {outlets: { internal: ['status-board']}}]);
    }
  }

  ngOnInit() { }
}
