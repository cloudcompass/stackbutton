import { Component, OnInit } from '@angular/core';
import { OpenShiftService } from '../_services/openshift.service';
import { OpenShiftServiceModel } from '../_models/openshiftService';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftPod } from '../_models/openshiftPod';
import {OpenShiftProject} from "../_models/openshiftProject";

@Component({
  selector: 'app-openshift-project-card',
  templateUrl: './openshift-project-card.component.html',
  styleUrls: ['./openshift-project-card.component.css']
})

/**
 * Let's plan this out...
 *
 * On init, grab the openshift data and parse it
 * Create components based on the data gathered
 *
 */
export class OpenshiftProjectCardComponent implements OnInit {

  private projectName: string;
  private apiVersion: string;

  private projectMembers: string[];
  private projectRoutes: OpenShiftRoute[];
  private projectServices: OpenShiftServiceModel[];
  private projectPods: OpenShiftPod[];

  constructor(private openShiftService: OpenShiftService) {
    console.log('wtf');

    this.projectMembers = [];
    this.projectRoutes = [];
    this.projectServices = [];
    this.projectPods = [];

    this.openShiftService.getOpenShiftData().subscribe(
      data => {
        for (const project of data) {
          console.log(project.project);

          this.projectName = project.project;
          this.apiVersion = project.apiVersion;

          for (const member of project.members) {
            console.log(member);
            this.projectMembers.push(member);
          }

          for (const item of project.items) {
            console.log('Item kind: ' + item.kind);
            switch (item.kind) {
              case 'Route': this.projectRoutes.push(item); break;
              case 'Service': this.projectServices.push(item); break
              case 'Pod': this.projectPods.push(item); break;
              default: console.log('Unexpected item kind found: ' + item.kind);
            }
          }

          // Now that the route, service, and pod data is populated, work out the connections
          // Create pods
          // Then create services
          // Then create routes

          console.log(this.projectRoutes[0].metadata.name);
          console.log(this.projectServices[1]);
          console.log(this.projectPods[2].metadata.name);


          // TEMP: Only here due to poor planning. Break after first project.
          break;
        }
      },
      error => {
        console.error('Error fetching OpenShift data: ' + error);
        // TODO: Display an error to the user
      }
    );

    // TESTING

    this.openShiftService.getOpenShiftProject('Eclipse-Kapua').subscribe(
      data => {
        // This check shouldn't have to go here, but a hack on the getOpenShiftProject warrants it
        // TODO: Figure out appropriate handling of errors for map(). Look into custom Response objects maybe? IDK
        if (data.error) {
          console.log('getOpenShiftProject error: ' + data.error);
        }

        // Cast the data to the expected model, since that's what's expected to return
        const proj: OpenShiftProject = data;
        console.log('getOpenShiftProject success: ' + proj.project);
        console.log('getOpenShiftProject success: ' + proj.members[0].name);
      },
      error => {
        console.log('getOpenShiftProject fail: ' + error);
      }
    );

      this.openShiftService.getProjectPod('Eclipse-Kapua', 'sql').subscribe(
      data => {
        // This check shouldn't have to go here, but a hack on the getProjectService warrants it
        // TODO: Figure out appropriate handling of errors for map(). Look into custom Response objects maybe? IDK
        if (data.error) {
          console.log('getProjectPod error: ' + data.error);
        }

        // Cast the data to the expected model, since that's what's expected to return
        console.log('pod found: ' + JSON.stringify(data));
      },
      error => {
        console.log('getOpenShiftProject fail: ' + error);
      }
    );



  }

  ngOnInit() { }

  getServiceNamed(serviceName: string): OpenShiftServiceModel {
    for (const service of this.projectServices) {
      // console.log('gSN: ' + serviceName + ' : ' + service.metadata.name);
      if (service.metadata.name === serviceName) {
        return service;
      }
    }
    return null;
  }

  getPodNamed(podName: string): OpenShiftPod {
    for (const pod of this.projectPods) {
      if (pod.metadata.labels.app === podName) {
        return pod;
      }
    };
    return null;
  }

}
