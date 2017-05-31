import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-registration-page',
  templateUrl: 'registration.component.html'
})
/**
 * RegistrationComponent displays a registration form to the user.
 * If registration is successful, this will prompt the user to login.
 */
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
          // If data exists, registration was successful, navigate to login component
          this.router.navigate(['/login']);
        },
        error => {
          // TODO: Display an error to the user
          console.log(error);
          this.loading = false;
        });
  }
}
