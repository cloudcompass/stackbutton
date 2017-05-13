import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'registration.component.html'
})

export class RegistrationComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          // Registration successful, navigate to login
          this.router.navigate(['/login']);
        },
        error => {
          // TODO: Display an error to the user
          console.log(error);
          this.loading = false;
        });
  }
}
