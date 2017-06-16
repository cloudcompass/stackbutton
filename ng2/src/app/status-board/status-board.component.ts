import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataSourceModel} from "../_models/dataSourceModel";

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

  private dataSources: any[]; // TODO: Replace any[] with dataSource[] type, once it's created

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
        console.log('Error retrieving dataSources: ' + error);
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

    const src = this.filterForm.controls.source.value.toString();
    const pn = this.filterForm.controls.projectName.value.toString();
    const tn = this.filterForm.controls.teamName.value.toString();

    // Due to poor implementation below, team members and tags will not be used yet
    const tm = this.filterForm.controls.teamMembers.value.toString();
    const tags = this.filterForm.controls.tags.value.toString();

    /**
     * Sorry about this
     */
    for (const dataSource of this.dataSources) {
      const ds = JSON.parse(dataSource);

      if (src && pn && tn) {
        if (src === ds.service.type && pn === ds.projectName && tn === ds.teamName) {
          console.log('x3 hit');
        }
      }
      else if (src && pn) {
        if (src === ds.service.type && pn === ds.projectName) {
          console.log('srcpn hit');
        }
      }
      else if (src && tn) {
        if (src === ds.service.type && tn === ds.teamName) {
          console.log('srctn hit');
        }
      }
      else if (src) {
        if (src === ds.service.type) {
          console.log('src hit');
          console.log(ds);
        }
      }
      else if (pn) {
        if (pn === ds.projectName) {
          console.log('pn hit');
        }
      }
      else if (tn) {
        if (tn === ds.teamName) {
          console.log('tn hit');
        }
      }
      else console.log('no filter');
    }
  }

  /**
   * Generate a widget to display data to the status board
   *
   * @param serviceSource  Source of the data (Github, Openshift, etc)
   * @param cardType  Type of card to generate (Commits, Issues, Pods, etc)
   * @param serviceID Unique service id that will be used to grab information from the server
   */
  generateCard(serviceSource: string, cardType: string, serviceID: number) {
    // Generate the widget and add it to the status board's display area
    console.log('Generate card: ' + serviceSource + ' : ' + cardType + ' : ' + serviceID);
  }
}
