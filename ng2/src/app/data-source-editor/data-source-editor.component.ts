import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenShiftService } from '../_services/openshift.service';


@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
export class DataSourceEditorComponent implements OnInit {
  isClicked: Boolean = false;

  apiForm: FormGroup;
  projectForm: FormGroup;
  editForm: FormGroup;

  sources: string[];
  projects: any[];


  constructor(private formBuilder: FormBuilder,
              private openshiftService: OpenShiftService) {
    this.createForm();

    this.sources = ['Github', 'Openshift'];

    // TESTING
    this.projects = ['Your mom', 'Project 2'];
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
    console.log('project submit');
    console.log(this.projectForm.controls.project.value);

    // On submission, activate and populate the edit form
  }

  editFormSubmit(event) {
    console.log('edit submit');
    console.log(this.editForm.controls.projectName.value);
    console.log(this.editForm.controls.teamName.value);

    console.log(this.editForm.controls.teamMembers.value);
    console.log(this.editForm.controls.tags.value);

    // TODO: Build a dataSource object, and save it locally
  }


}
