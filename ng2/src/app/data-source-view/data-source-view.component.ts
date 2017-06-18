import { Component, OnInit, Input } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';

@Component({
  selector: 'app-data-source-view',
  templateUrl: './data-source-view.component.html',
  styleUrls: ['./data-source-view.component.css']
})
export class DataSourceViewComponent implements OnInit {
  @Input() sourceID: string;

  private projectName: string;
  private teamName: string;
  private serviceType: string;
  private teamMembers: string[];
  private tags: string[];

  constructor(private dataSourceService: DataSourceService) { }

  ngOnInit() {
    this.dataSourceService.getDataSourceByID(this.sourceID).subscribe(
      data => {
        const d = JSON.parse(data);

        this.projectName = d.projectName;
        this.teamName = d.teamName;
        this.serviceType = d.service.type;

        this.teamMembers = [];
        for (const m of d.teamMembers) {
          this.teamMembers.push(m.name);
        }

        this.tags = [];
        for (const t of d.metadata) {
          this.tags.push(t);
        }
      },
      error => {

      }
    );
  }

  editClick() {
    console.log('Edit click: ' + this.sourceID);
    // TODO: Pass this specific data source to the data-source-add component and load it
    // Not currently supported
  }

  deleteClick() {
    console.log('Delete click: ' + this.sourceID);
    this.dataSourceService.removeDataSourceByID(this.sourceID);
  }

}
