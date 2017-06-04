import { Component, OnInit } from '@angular/core';
import { OpenShiftService } from '../_services/openshift.service';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftPod } from '../_models/openshiftPod';

@Component({
  selector: 'app-openshift-project-card',
  templateUrl: './openshift-project-card.component.html',
  styleUrls: ['./openshift-project-card.component.css']
})
export class OpenshiftProjectCardComponent implements OnInit {

  private projectName: string;
  private apiVersion: string;

  private projectMembers: string[];
  private projectRoutes: OpenShiftRoute[];
  private projectServices: OpenShiftService[];
  private projectPods: OpenShiftPod[];

  constructor(private openShiftService: OpenShiftService) {
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
              case 'Pod':
                this.projectPods.push(item);
                const itm: OpenShiftPod = item;
                console.log('  Pod name: ' + itm.metadata.name);
                console.log('  Pod namespace: ' + itm.metadata.namespace);

                for (const container of itm.spec.containers) {
                  console.log('    Container name: ' + container.name);
                  console.log('    Container image: ' + container.image);
                  if (container.ports) {
                    console.log('      Ports: ');
                    for (const port of container.ports) {
                      console.log('      ' + port.containerPort + '/' + port.protocol);
                    }
                  }
                }
                break;
            }
          }

          // TEMP: Only here due to poor planning. Break after first project.
          break;
        }
      },
      error => {
        console.error('Error fetching OpenShift data: ' + error);
        // TODO: Display an error to the user
      }
    );
  }

  ngOnInit() {
  }

}
