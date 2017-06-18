import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';

@Component({
  selector: 'app-data-source-manage',
  templateUrl: './data-source-manage.component.html',
  styleUrls: ['./data-source-manage.component.css']
})
export class DataSourceManageComponent implements OnInit {
  private sourceIDArray: string[];

  constructor(private dataSourceService: DataSourceService) { }

  ngOnInit() {

    this.dataSourceService.getDataSources().subscribe(
      data => {
        this.sourceIDArray = [];

        for (const d of data) {
          this.sourceIDArray.push(JSON.parse(d).sourceID);
        }
      }
    );
  }

}
