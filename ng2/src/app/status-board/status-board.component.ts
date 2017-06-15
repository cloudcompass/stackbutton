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

  // TODO: Declare filter values here
  private sourceFilter: string;
  private typeFilter: string;
  private teamFilter: string;
  private tagFilters: string[];

  private dataSource: any[]; // TODO: Replace any[] with dataSource[] type, once it's created

  sources: string[]; // Const that should be stored elsewhere

  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dataSourceService: DataSourceService) {
    this.sources = ['Github', 'OpenShift'];

    this.createForm();

  }

  ngOnInit() {
    // Attempt to populate datasource[] by looking in the database for stored information

    // If datasource[] is then found to be empty, display the empty-state (getting-started) component
    // Else display the status-board and filter options
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
  filterSubmit() {
    // Iterate data sources and check against filters
    // ie. if (ds.source == filter.souce && ds.type == filter.type) generateWidget(ds.source, ds.type, ds.serviceID)
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
