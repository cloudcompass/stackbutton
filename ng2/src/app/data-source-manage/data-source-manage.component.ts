import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';

@Component({
  selector: 'app-data-source-manage',
  templateUrl: './data-source-manage.component.html',
  styleUrls: ['./data-source-manage.component.css']
})
export class DataSourceManageComponent implements OnInit {
  private sourceIDArray: string[];
  emptyStateEnabled: boolean;

  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit() {
    // Check for locally stored dataSources and, if found, display the filter options
    this.dataSourceService.getDataSources().subscribe(
      data => {
        this.sourceIDArray = [];
        for (const d of data) {
          this.sourceIDArray.push(JSON.parse(d).sourceID);
        }
        console.log(data);
        this.emptyStateEnabled = false;
      },
      error => {
        // Display 'getting started' / No data sources found
        console.log('Error retrieving dataSources: ' + error);
        this.emptyStateEnabled = true;
      }
    );
  }

}
