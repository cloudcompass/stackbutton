import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
export class DataSourceEditorComponent implements OnInit {
  isClicked: Boolean = false;
  constructor() { }

  ngOnInit() {}

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }

  toggle() {
    this.isClicked = !this.isClicked;
  }

}
