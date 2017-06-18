import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';

@Component({
  selector: 'app-data-source-manage',
  templateUrl: './data-source-manage.component.html',
  styleUrls: ['./data-source-manage.component.css']
})
export class DataSourceManageComponent implements OnInit {
  private sourceIDArray: string[];

  constructor(private dataSourceService: DataSourceService) {
    console.log('dss bo: ' + this.dataSourceService.hasDataSources());
  }

  ngOnInit() {
    // Check for locally stored dataSources and populate the array used to generate the components
    this.dataSourceService.getDataSources().subscribe(
      data => {
        this.sourceIDArray = [];
        for (const d of data) {
          this.sourceIDArray.push(JSON.parse(d).sourceID);
        }
      },
      error => {
        console.log('Error retrieving dataSources: ' + error);
      }
    );
  }

  removeView(sourceID: string) {
    const index: number = this.sourceIDArray.indexOf(sourceID);
    if (index !== -1) this.sourceIDArray.splice(index, 1);
    if (this.sourceIDArray.length === 0) this.sourceIDArray = null;
  }
}
