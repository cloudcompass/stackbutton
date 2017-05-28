import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }
  get isOpen() {
    return this._isOpen;
  }

  constructor() { }


  ngOnInit() {
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }

  toggleOpen(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

}
