import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilization-bar',
  templateUrl: './utilization-bar.component.html',
  styleUrls: ['./utilization-bar.component.css']
})
export class UtilizationBarComponent implements OnInit {
  progressDescription: string;
  measureUnit: string;
  valueMin: number;
  valueMax: number;
  valueNow: number;
  progressPercent: number;
  dataStyle: {};

constructor() {
  this.progressDescription = 'Stack Progress';
  this.measureUnit = 'drps';
  this.valueMin = 0;
  this.valueMax = 100;
  this.valueNow = 100;
  // this.progressPercent = this.valueMax / this.valueMin;
  this.dataStyle = {
    'width': this.valueNow ? this.valueNow : this.valueNow
  };
}

  ngOnInit() {
  }

}
