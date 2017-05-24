import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

import { GithubIssuesService } from '../_services/github-issues.service';
import { GithubUserService } from '../_services/github-user.service';


@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.css']
})
export class StatusBoardComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService,
              private gis: GithubIssuesService,
              private gus: GithubUserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

}
