import {Component, OnInit } from '@angular/core';
import { DataSourceService } from '../_services/data-source.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GithubProjectService } from '../_services/github-project.service';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.css'],
})

/**
 * StatusBoardComponent houses several filter options that can be selected then applied.
 * It will then use the filters to create and display data visualization widgets based on a data source.
 * If no data sources exist, an empty-state (getting started) page will be displayed, prompting the user to add services
 */
export class StatusBoardComponent implements OnInit {
  private filterForm: FormGroup;

  private dataSources: any[];
  private filteredProjects: any[];

  // Variables to store information required by cards to generate
  private openShiftProjectNames: any;
  private githubCommits: any;
  private githubIssues: any;

  private sources: string[]; // Const that should be stored elsewhere

  constructor(private formBuilder: FormBuilder,
              private dataSourceService: DataSourceService,
              private githubProjectService: GithubProjectService) {
    this.sources = ['Github', 'OpenShift'];
    this.createForm();
  }

  ngOnInit() {
    // Check for locally stored dataSources and, if found, display the filter options
    this.dataSourceService.getDataSources().subscribe(
      data => {
        console.log('stat data');
        console.log(data);
        this.dataSources = data;
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
    // Reset stored filtered projects
    this.filteredProjects = [];

    // Short-handed helpers
    const src = this.filterForm.controls.source.value.toString();
    const pn = this.filterForm.controls.projectName.value.toString();
    const tn = this.filterForm.controls.teamName.value.toString();

    // Note: Due to poor implementation below, team members and tags will not be used yet
    const tm = this.filterForm.controls.teamMembers.value.toString();
    const tags = this.filterForm.controls.tags.value.toString();

    // Note: These arrays should make iterating through the values easier
    const tagsArray = this.arrayFromCSV(this.filterForm.controls.teamMembers.value.toString());
    const teamMembersArray = this.arrayFromCSV(this.filterForm.controls.tags.value.toString());

    // Iterate data sources and check against filters
    // Note: sorry about this
    for (const dataSource of this.dataSources) {
      const ds = JSON.parse(dataSource);

      if (src && pn && tn) {
        if (src === ds.service.type && pn === ds.projectName && tn === ds.teamName) this.filteredProjects.push(ds);
      }
      else if (src && pn) {
        if (src === ds.service.type && pn === ds.projectName) this.filteredProjects.push(ds);
      }
      else if (src && tn) {
        if (src === ds.service.type && tn === ds.teamName) this.filteredProjects.push(ds);
      }
      else if (src) {
        if (src === ds.service.type) this.filteredProjects.push(ds);
      }
      else if (pn) {
        if (pn === ds.projectName) this.filteredProjects.push(ds);
      }
      else if (tn) {
        if (tn === ds.teamName) this.filteredProjects.push(ds);
      }
      else {
        // If no filter was supplied, just add the data source
        this.filteredProjects.push(ds);
      }
    }

    if (this.filteredProjects.length > 0) {
      this.generateCards();
    }
  }

  /**
   * Iterate through filtered dataSources and extract the necessary variables that will be used
   * to populate the cards
   */
  generateCards() {
    const ghpNames: any[] = [];
    this.openShiftProjectNames = [];

    // Iterate through filtered projects and populate github/openshift names
    // This step could be integrated with below, but wasn't?
    for (const ds of this.filteredProjects) {
      if (ds.service.type === 'OpenShift') {
        this.openShiftProjectNames.push(ds.projectName);
      }
      if (ds.service.type === 'Github') {
        ghpNames.push(ds.projectName);
      }
    }

    // Iterate through the found Github names, and populate commits/issues using Github project data
    if (ghpNames) {
      for (const n of ghpNames) console.log('ghp: ' + n);
      this.githubProjectService.getGithubProjects(ghpNames).subscribe(
        data => {
          for (const project of data) {
            for (const item of project.items) {
              if (item.kind === 'commit') {
                if (!this.githubCommits[project.project]) this.githubCommits[project.project] = [];
                this.githubCommits[project.project].push(item.sha);
              }
              if (item.kind === 'issue') {
                if (!this.githubIssues[project.project]) this.githubIssues[project.project] = [];
                this.githubIssues[project.project].push(item.id);
              }
            }
          }
        },
        error => {
          console.log('Error retrieving github projects by names: ' + error);
        }
      );
    }
  }

  /**
   * Returns an array of strings from a supplied csv. Omits empty values.
   *
   * @param csvString
   * @returns {string}
   */
  arrayFromCSV(csvString: string) {
    if (!csvString || csvString === '') {
      console.log('Invalid csvString supplied: ' + csvString);
      return;
    }

    const collector: string[] = [];
    for (const string of csvString.split(',')) {
      if (string !== '') collector.push(string.trim());
    }
    console.log('col: ' + collector.toString());
    return collector;
  }

  /**
   * Clear the variables used to generate the cards
   */
  clearCards() {
    this.githubCommits = {};
    this.githubIssues = {};
    this.openShiftProjectNames = [];
  }

  /**
   * Helper function that converts an object into an array
   * Used in the *ngFor HTML divs
   */
  private getAsArray(val) {
    const ret = [];
    for (const k in val) ret.push(k);
    return ret;
  }
}
