import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenShiftService } from '../_services/openshift.service';
import { DataSourceModel } from '../_models/dataSourceModel';
import {local} from "d3-selection";


@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
export class DataSourceEditorComponent implements OnInit {
  apiForm: FormGroup;
  projectForm: FormGroup;
  editForm: FormGroup;
  sources: string[];
  projects: any[];


  private showProjectForm: boolean;
  private showEditForm: boolean;

  // To keep a local copy of the data retrieved
  private data: any;


  constructor(private formBuilder: FormBuilder,
              private openshiftService: OpenShiftService) {
    this.createForm();
    this.projects = [];

    this.showEditForm = false;
    this.showProjectForm = false;
    this.sources = ['Github', 'OpenShift'];
  }

  ngOnInit() { }

  createForm() {
    this.apiForm = this.formBuilder.group({
      source: ['', Validators.required],
      apikey: ['', Validators.required]
    });

    this.projectForm = this.formBuilder.group({
      project: ['', Validators.required]
    });

    this.editForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      teamName: ['', Validators.required],
      teamMembers: ['', Validators.required],
      tags: ''
    });
  }

  /**
   * Grab the user inputs on the apiForm, populate and show the project form if data is found
   * TODO: APIkey isn't actually used and it just a placeholder. Use it
   *
   * @param event
   */
  apikeyFormSubmit(event) {
    // Clear forms and hide edit
    this.clearProjectForm();
    this.clearEditForm();
    this.showEditForm = false;

    // Display and populate the project form
    this.showProjectForm = true;

    // Based on the source selection, query the appropriate service and retrieve the projects
    switch (this.apiForm.controls.source.value) {
      case 'OpenShift':
        // TEMP: Grab the sample data from the openshiftService
        this.openshiftService.getOpenShiftData().subscribe(
          data => {
            this.data = data;

            for (const project of this.data) {
              this.projects.push(project.project);
            }
          },
          error => {
            // TODO: Display an error to the user
            console.log('Error retrieving OpenShift projects: ' + error);
          }
        );
        break;
      case 'Github':
        // TEMP: sample Github projects
        this.projects = ['Stackbutton', 'Project 2'];
        break;
      default:
        // TODO: Display an error to the user
        console.log('Invalid API source supplied: ' + this.apiForm.controls.source.value);
    }
  }

  /**
   * Grab the user inputs on the projectForm, populate and show the editForm
   *
   * @param event
   */
  projectFormSubmit(event) {
    // Reset edit form
    this.clearEditForm();
    this.showEditForm = true;

    // Display and populate the edit form based on the project selected
    switch (this.apiForm.controls.source.value) {
      case 'OpenShift':

        // Iterate over the retrieved projects, find a specific project name, then populate editForm with its data
        for (const project of this.data) {
          if (project.project === this.projectForm.controls.project.value) {

            // Flatten the member names into a csv to display in editForm
            const memberNames: string[] = [];
            for (const member of project.members) {
              memberNames.push(member.name);
            }
            this.editForm.setValue({
              projectName: project.project ? project.project : '',
              teamName: '', // Note, team name doesn't exist in the generated openShift data yet
              teamMembers: memberNames ? memberNames : '',
              tags: ''
            });
            return;
          }
        }
        break;
      case 'Github':
        // TEMP: sample data. This would be the result of the github service query
        let sampleData: any;
        if (this.projectForm.controls.project.value === 'Stackbutton') {
          sampleData = {
            projectName: this.projectForm.controls.project.value,
            teamName: 'BamDev',
            teamMembers: 'Lee Combs, Curtis LayCraft, Sheryll Tabamo'
          };
        }
        else {
          sampleData = {
            projectName: this.projectForm.controls.project.value,
            teamName: 'Hardcore Parkour',
            teamMembers: 'Banana Man, Tim, FirstName LastName, More Names, who, when, how'
          };
        }

        // On submission, activate and populate the edit form
        this.editForm.setValue({
          projectName: sampleData.projectName ? sampleData.projectName : '',
          teamName: sampleData.teamName ? sampleData.teamName : '',
          teamMembers: sampleData.teamMembers ? sampleData.teamMembers : '',
          tags: ''
        });
        break;
      default:
        // TODO: Display error to the user
        console.log('Invalid project submitted: ' + this.apiForm.controls.service.value);
    }
  }

  /**
   * Grab the user inputs on the editForm, generate a dataSource object, then store it locally (TODO: store to db)
   *
   * @param event
   */
  editFormSubmit(event) {
    console.log('edit submit');
    console.log(this.editForm.controls.projectName.value);
    console.log(this.editForm.controls.teamName.value);
    console.log(this.editForm.controls.teamMembers.value);
    console.log(this.editForm.controls.tags.value);

    // Build a dataSource object, then save it locally
    const dataSource: DataSourceModel = new DataSourceModel();

    // Figure out project and service details
    dataSource.projectName = this.editForm.controls.projectName.value.toString();
    dataSource.service = {
      type: this.apiForm.controls.source.value as string,
      apikey: this.apiForm.controls.apikey.value as string
    };
    dataSource.serviceID = 'service123';  // TODO: Should come from query source?

    // Figure out team details
    dataSource.teamName = this.editForm.controls.teamName.value;

    /**
     * ///////////////
     * // Dev Note //
     * //////////////
     *
     * The teamMembersInput sucks being here. While you can add team members with just their name,
     * this doesn't really allow member roles or unique ids... That should be coming straight from the service
     * query itself, but, even then, not all sources are guaranteed to have roles and ids.
     *
     * This should be re-thought out and managed differently. Either have the teamMembers input force a role input,
     * have the queries attempt to parse the original service query and match team names, or just have the original
     * team members immutable, and teamMembers input would tack on team members that aren't generated from the query.
     *
     * Even then, unique ids aren't really forcible, since shared names can exist.
     */
    // teamMembersInput can be a csv, so split the names up and add them as json objects to teamMembers
    const teamMembersInput: string = this.editForm.controls.teamMembers.value.toString();
    const teamMembersSplit = teamMembersInput.split(',');
    dataSource.teamMembers = [];
    for (const member of teamMembersSplit) {
      let obj: any;
      obj = {
        name: member,
        role: '', // See note above, should come from query source
        uuid: '' // See note above, should come from query source
      };
      dataSource.teamMembers.push(obj);
    };

    /**
     * ///////////////
     * // Dev Note //
     * //////////////
     *
     * Metadata should be stored as a json object instead of a string array.
     * This would require model and input rework, but would make this much more useful
     * Could then sort by location, dates, types, etc.
     */
    // metadata input can be a csv, sp split the input up and add them somehow
    const metadataInput: string = this.editForm.controls.tags.value.toString();
    dataSource.metadata = metadataInput.split(',');


    // Generate a unique id for this dataSource
    const dsID = dataSource.projectName + this.apiForm.controls.apikey.value;
    dataSource.sourceID = dsID;

    // Get the local storage datasources, and add the new datasource to it
    let storedDataSources = JSON.parse(localStorage.getItem('stackDataSources'));

    if (!storedDataSources) storedDataSources = [];
    else {
      for (const ds of storedDataSources) {
        if (JSON.parse(ds).sourceID === dataSource.sourceID) {
          console.log('Duplicate source found: ' + dataSource.sourceID);
          return;
        }
      }
    }

    storedDataSources.push(JSON.stringify(dataSource));
    localStorage.setItem('stackDataSources', JSON.stringify(storedDataSources));
  }

  // Helper methods

  private clearProjectForm() {
    this.projects = [];
    this.projectForm.setValue({
      project: ''
    });
  }

  private clearEditForm() {
    this.editForm.setValue({
      projectName: '',
      teamName: '',
      teamMembers: '',
      tags: ''
    });
  }
}
