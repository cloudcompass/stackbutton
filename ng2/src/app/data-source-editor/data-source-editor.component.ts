import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenShiftService } from '../_services/openshift.service';
import { DataSourceModel } from '../_models/dataSourceModel';


@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
/**
 * TODO: If new api key is given, repopulate project and hide edit
 * If new project is selected, repopulate edit...
 *
 */
export class DataSourceEditorComponent implements OnInit {
  apiForm: FormGroup;
  projectForm: FormGroup;
  editForm: FormGroup;

  sources: string[];
  projects: any[];

  // Temp
  private showProjectForm: boolean;
  private showEditForm: boolean;

  // More temp?
  private osData: any;


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
        this.openshiftService.getOpenShiftData().subscribe(
          data => {
            this.osData = data;

            for (const project of this.osData) {
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
        // Load sample Github projects
        this.projects = ['Stackbutton', 'Project 2'];
        break;
      default:
        // TODO: Display an error to the user
        console.log('Invalid API source supplied: ' + this.apiForm.controls.source.value);
    }
  }

  projectFormSubmit(event) {
    // Reset edit form
    this.clearEditForm();
    this.showEditForm = true; // TEMP


    // Display and populate the edit form based on the project selected
    if (this.apiForm.controls.source.value === 'OpenShift') {
      console.log('os');
      for (const project of this.osData) {
        if (project.project === this.projectForm.controls.project.value) {

          let memberNames: string[] = [];
          for (const member of project.members) {
            memberNames.push(member.name);
          }

          this.editForm.setValue({
            projectName: project.project,
            teamName: '',
            teamMembers: memberNames,
            tags: ''
          });
          return;
        }
      }
    }

    // TESTING sample data. This would be the result of the service query
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
  }

  editFormSubmit(event) {
    console.log('edit submit');
    console.log(this.editForm.controls.projectName.value);
    console.log(this.editForm.controls.teamName.value);
    console.log(this.editForm.controls.teamMembers.value);
    console.log(this.editForm.controls.tags.value);

    // TODO: Build a dataSource object, and save it locally
    const dataSource: DataSourceModel = new DataSourceModel();

    dataSource.sourceID = 'source123';
    dataSource.projectName = this.editForm.controls.projectName.value;
    dataSource.projectName = 'project123';
    dataSource.teamName = this.editForm.controls.teamName.value;

    const teamMembersInput = this.editForm.controls.teamMembers.value as string;
    const teamMembersSplit = teamMembersInput.split(',');

    dataSource.teamMembers = [

    ];

    
    for (const member of teamMembersSplit) {

    }

    // Temp team
    dataSource.teamMembers = [
      {
        name: 'Lee Combs',
        role: 'admin',
        uuid: 'lee123'
      },
      {
        name: 'Curtis LayCraft',
        role: 'contribute',
        uuid: 'curtis123'
      },
      {
        name: 'Sheryll Tabamo',
        uuid: 'sheryll123'
      }
    ];
    dataSource.service = {
      type: this.apiForm.controls.source.value as string,
      apikey: this.apiForm.controls.apikey.value as string
    };
    dataSource.serviceID = 'service123';

    // Temp metadata
    dataSource.metadata = {
      location: 'Victoria'
    };

    console.log('dataSource: ' + JSON.stringify(dataSource));
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
