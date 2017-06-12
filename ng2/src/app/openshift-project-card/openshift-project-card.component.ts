import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftService } from '../_services/openshift.service';
import { OpenShiftServiceModel } from '../_models/openshiftServiceModel';
import { OpenShiftRouteModel } from '../_models/openshiftRouteModel';
import { OpenShiftPodModel } from '../_models/openshiftPodModel';

@Component({
  selector: 'app-openshift-project-card',
  templateUrl: './openshift-project-card.component.html',
  styleUrls: ['./openshift-project-card.component.css']
})
/**
 * The main Card to display OpenShift project data
 */
export class OpenshiftProjectCardComponent implements OnInit {
  @Input() projectName: string;

  private apiVersion: string;

  private projectMembers: string[];
  private projectRoutes: OpenShiftRouteModel[];
  private projectServices: OpenShiftServiceModel[];
  private projectPods: OpenShiftPodModel[];

  constructor(private openShiftService: OpenShiftService) {
    this.projectMembers = [];
    this.projectRoutes = [];
    this.projectServices = [];
    this.projectPods = [];
  }

  ngOnInit() {
    if (this.projectName === '' || !this.projectName) {
      console.log('Invalid Project name supplied: ' + this.projectName);
      console.log('Ensure you create the component by supplying a name. (i.e. [projectName]="Eclipse-Kapua"');
      return;
    }

    this.openShiftService.getOpenShiftProject(this.projectName).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift project: ' + data.error);
          return;
        }

        // Set component variables based on retrieved data
        this.apiVersion = data.apiVersion;
        this.projectMembers = data.members;

        // Iterate over the OpenShift items in the project, and place them in specific arrays
        for (const item of data.items) {
          switch (item.kind) {
            case 'Route': this.projectRoutes.push(item); break;
            case 'Service': this.projectServices.push(item); break
            case 'Pod': this.projectPods.push(item); break;
            default: console.log('Unexpected item kind found: ' + item.kind);
          }
        }
      },
      error => {
        // TODO: Display an error to the user
        console.error('Error fetching OpenShift data: ' + error);
      }
    );
  }

}
