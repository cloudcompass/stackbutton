import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-page',
  templateUrl: './internal-page.component.html',
  styleUrls: ['./internal-page.component.css']
})

/**
 * All InternalPageComponent is is a container for the navigation bar and a named 'internal' router
 * All internal-page content (status-board, service management, etc.) will be handled in the 'internal' router
 */
export class InternalPageComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
