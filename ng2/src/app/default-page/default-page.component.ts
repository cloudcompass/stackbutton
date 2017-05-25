import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router) {
    // Check for a logged in user, and redirect them based on if they exist, and if they're new
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser == null) {
      this.router.navigate(['/']);
    }
    else {
      // If the logged in user is new, send them to the getting-started page, otherwise go to the dashboard
      // TODO: isNewUser shouldn't be null
      if (this.currentUser.isNewUser === true || this.currentUser.isNewUser == null) {

        // TODO: isNewUser should be set to false only when the user completes or skips the getting-started intro
        this.currentUser.isNewUser = false;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.router.navigate(['/empty-state']);
      }
      else this.router.navigate(['/status-board']);
    }

  }

  ngOnInit() {
  }

}
