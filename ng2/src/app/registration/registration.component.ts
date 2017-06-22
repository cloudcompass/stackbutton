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
  errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService) {
    this.errorMessage = '';
  }

  register() {
    // todo: check for existing username. Cannot have duplicates
    // Note: This would be handled by userService, which would respond to the query with an error, handled here
    this.loading = true;
    this.userService.create(this.model).subscribe(
      data => {
        // If data exists, registration was successful, navigate to login component
        this.router.navigate(['/splash-page', {outlets: { splash: ['login']}}]);
      },
      error => {
        console.log(error);
        this.errorMessage = 'Problem with registration';
        this.loading = false;
      }
    );
  }
}
