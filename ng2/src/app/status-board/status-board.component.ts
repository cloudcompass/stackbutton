import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.css']
})

/**
 * StatusBoardComponent houses several filter options that can be selected then applied.
 * It will then use the filters to create and display data visualization widgets based on a data source.
 * If no data sources exist, an empty-state (getting started) page will be displayed, prompting the user to add services
 */
export class StatusBoardComponent implements OnInit {
  private showFilter: boolean;

  // TODO: Declare filter values here
  private sourceFilter: string;
  private typeFilter: string;
  private teamFilter: string;
  private tagFilters: string[];

  private dataSources: any; // TODO: Replace any[] with dataSource[] type, once it's created

  sources: string[]; // Const that should be stored elsewhere

  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dataSourceService: DataSourceService) {
    this.sources = ['Github', 'OpenShift'];
    this.showFilter = false;
    this.createForm();
  }

  ngOnInit() {
    this.dataSourceService.getDataSources().subscribe(
      data => {
        console.log('stat data');
        console.log(data);
        for (const d of data) console.log('d: ' + d);
        this.dataSources = data;
        this.showFilter = true;
      },
      error => {
        // Display 'getting started' / No data sources found
      }
    );
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      source: '',
      projectName: '',
      teamName: '',
      teamMembers: '',
      tags: ''
    });
  }


  /**
   * Use the selected filters and iterate through stored data sources.
   * If a data source matches the filter criteria, generate the associated widget and add it to the status board
   */
  filterSubmit(event) {
    // Iterate data sources and check against filters
    // ie. if (ds.source == filter.souce && ds.type == filter.type) generateWidget(ds.source, ds.type, ds.serviceID)

    console.log('filter submit');
    console.log(this.filterForm.controls.source.value);
    console.log(this.filterForm.controls.projectName.value);
    console.log(this.filterForm.controls.teamName.value);
    console.log(this.filterForm.controls.teamMembers.value);
    console.log(this.filterForm.controls.tags.value);
  }

  /**
   * Generate a widget to display data to the status board
   *
   * @param widgetSource  Source of the data (Github, Openshift, etc)
   * @param widgetType  Type of widget to generate (Commits, Issues, Pods, etc)
   * @param serviceID Unique service id that will be used to grab information from the server
   */
  generateWidget(widgetSource: string, widgetType: string, serviceID: number) {
    // Generate the widget and add it to the status board's display area
  }
}
