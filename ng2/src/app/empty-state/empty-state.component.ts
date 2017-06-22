import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#fff';
  }

  mainAction(event) {
    this.router.navigate(['/internal-page', {outlets: { internal: ['data-source-editor']}}]);
  }
}
