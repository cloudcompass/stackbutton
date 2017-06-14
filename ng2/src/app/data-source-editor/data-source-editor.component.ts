import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenShiftService } from '../_services/openshift.service';
import {DataSourceModel} from "../_models/dataSourceModel";


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
  isClicked: Boolean = false;

  apiForm: FormGroup;
  projectForm: FormGroup;
  editForm: FormGroup;

  sources: string[];
  projects: any[];

  // Temp
  private showProjectForm: boolean;
  private showEditForm: boolean;


  constructor(private formBuilder: FormBuilder,
              private openshiftService: OpenShiftService) {
    this.createForm();
    this.showEditForm = false;
    this.showProjectForm = false;
    this.sources = ['Github', 'OpenShift'];

    // TESTING
    this.projects = ['Stackbutton', 'Project 2'];
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
    this.showProjectForm = true; // TEMP

    console.log('api submit');
    console.log(this.apiForm.controls.source.value);
    console.log(this.apiForm.controls.apikey.value);

    // TODO: Once the api key is submitted, attempt to query the service
    // For now, if Github, load fake projects...?
    // For openshift, load sample data
    // On success, activate and populate the project form
    // On fail, display the error
  }

  projectFormSubmit(event) {
    this.showEditForm = true; // TEMP

    console.log('project submit');
    console.log(this.projectForm.controls.project.value);

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
    const dataSource: DataSourceModel = {
      sourceID: 'source123',
      projectName: this.editForm.controls.projectName.value,
      projectID: 'project123',
      teamName: this.editForm.controls.teamName.value,

      // Temp member value, to be generated later
      teamMembers: [
        {
          name: 'Lee Combs',
          role: 'admin',
          uuid: 'lee123'
        },
        {
          name: 'Curtis LayCraft',
          role: 'admin',
          uuid: 'curtis123'
        },
        {
          name: 'Sheryll Tabamo',
          role: 'contribute',
          uuid: 'sheryll123'
        }
      ],
      service: {
        type: this.apiForm.controls.source.value as string,
        apikey: this.apiForm.controls.apikey.value as string,
        misc: ['']
      },
      serviceID: 'service123',
      // Temp metadata value, to be generated later
      metadata: {
        location: 'Victoria',
        creationTimestamp: 'what'
      }
    };

    console.log('ds: ' + JSON.stringify(dataSource));
  }


}
