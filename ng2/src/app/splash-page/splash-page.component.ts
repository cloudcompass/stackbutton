import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
/**
 * SplashPageComponent is the entry point for new and non logged in users.
 * It displays information about Stackbutton, and gives links for registration, login, and downloading
 *
 * TODO: If a logged in user is detected on this page, instead of login/register, display a 'Go To Dashboard' option
 */
export class SplashPageComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
