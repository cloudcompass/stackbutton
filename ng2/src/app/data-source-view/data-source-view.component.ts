import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';

@Component({
  selector: 'app-data-source-view',
  templateUrl: './data-source-view.component.html',
  styleUrls: ['./data-source-view.component.css']
})
export class DataSourceViewComponent implements OnInit {
  @Input() sourceID: string;
  @Output() destroyCheck: EventEmitter<string>;

  private projectName: string;
  private teamName: string;
  private serviceType: string;
  private teamMembers: string[];
  private tags: string[];

  constructor(private dataSourceService: DataSourceService) {
    this.destroyCheck = new EventEmitter<string>();
  }

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
        console.log('Error retrieving data source ' + this.sourceID + ': ' + error);
      }
    );
  }

  editClick() {
    console.log('Edit click: ' + this.sourceID);
    // TODO: Pass this specific data source to the data-source-add component and load it
    // Not currently supported
  }

  deleteClick() {
    this.dataSourceService.removeDataSourceByID(this.sourceID);
    this.destroyCheck.emit('destroyed');
  }
}
