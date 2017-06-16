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
  private showFilter: boolean;
  private showCards: boolean;
  filterForm: FormGroup;

  private generatedCards: boolean;

  private filteredProjects: any[];
  private dataSources: any[];

  // What am I doing
  private osSources: any[];
  private ghSources: any[];

  private ghCommitShas: any[];
  private ghIssueIDs: any[];

  // huh
  private osNames: any;
  private ghCommits: any;
  private ghIssues: any;


  sources: string[]; // Const that should be stored elsewhere

  constructor(private formBuilder: FormBuilder,
              private dataSourceService: DataSourceService,
              private githubProjectService: GithubProjectService) {
    this.sources = ['Github', 'OpenShift'];
    this.showFilter = false;
    this.createForm();
    this.osSources = [];
    this.ghSources = [];

    this.generatedCards = false;
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

    // Short-handed helpers
    const src = this.filterForm.controls.source.value.toString();
    const pn = this.filterForm.controls.projectName.value.toString();
    const tn = this.filterForm.controls.teamName.value.toString();

    // Due to poor implementation below, team members and tags will not be used yet
    const tm = this.filterForm.controls.teamMembers.value.toString();
    const tags = this.filterForm.controls.tags.value.toString();

    // Reset stored filtered projects
    this.filteredProjects = [];

    /**
     * Sorry about this
     */
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
      else console.log('no filter');
    }

    if (this.filteredProjects.length > 0) this.generateCards();
  }


  generateCards() {
    // Now what do you do
    // You sleep on it
    // Iterate and store shit? Can you inject html components through ts? WHO KNOWS


    this.ghCommitShas = [];
    this.ghIssueIDs = [];

    this.ghCommits = {};
    this.ghIssues = {};

    console.log('Generate cards');
    const ghpNames: any[] = [];
    this.osNames = [];

    for (const ds of this.filteredProjects) {
      this.showCards = true;
      console.log('fp: ' + ds);
      if (ds.service.type === 'OpenShift') {
        this.osNames.push(ds.projectName);
      }

      if (ds.service.type === 'Github') {
        ghpNames.push(ds.projectName);
      }
    }

    // Deal with found github projects
    if (ghpNames) {
      for (const n of ghpNames) console.log('ghp: ' + n);
      this.githubProjectService.getGithubProjectsByName(ghpNames).subscribe(
        data => {
          for (const project of data) {
            for (const item of project.items) {
              if (item.kind === 'commit') {
                if (!this.ghCommits[project.project]) this.ghCommits[project.project] = [];
                this.ghCommits[project.project].push(item.sha);
              }
              if (item.kind === 'issue') {
                if (!this.ghIssues[project.project]) this.ghIssues[project.project] = [];
                this.ghIssues[project.project].push(item.id);
              }
            }
          }
        }
      );
    }

    // Deal with found openshift projects
    if (this.osNames) {
      console.log('osn: ' + this.osNames);
      for (const name of this.osNames) {
        console.log('name: ' + name);
      }
    }
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
