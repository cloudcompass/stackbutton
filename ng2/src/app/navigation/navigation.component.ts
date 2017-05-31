import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
/**
 * NavigationComponent is a container for the internal-page navigation buttons (status board, services, etc)
 * It also displays alerts, the current user's information, and logout button
 *
 * TODO: loadAllUsers and deleteUser are temporary and should be put somewhere else at a later time
 */
export class NavigationComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  /**
   * Logout the current user then send them to the default page
   */
  logoutClick() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }
}
