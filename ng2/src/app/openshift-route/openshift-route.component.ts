import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftServiceModel } from '../_models/openshiftService';
import {OpenShiftService} from "../_services/openshift.service";

@Component({
  selector: 'app-openshift-route',
  templateUrl: './openshift-route.component.html',
  styleUrls: ['./openshift-route.component.css']
})
export class OpenshiftRouteComponent implements OnInit {
  @Input() name: string;
  @Input() projectName: string;

  private loading: boolean;
  private routeData: OpenShiftRoute;

  private appName: string;
  private host: string;

  private services: OpenShiftServiceModel[];

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {
    this.loading = true;

    this.services = [];

    // TODO: Explain this nonsnse

    this.openShiftService.getProjectRoute(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

        this.routeData = data;
        this.appName = this.routeData.metadata.labels.app;
        this.host = this.routeData.spec.host;

        // Start NESTING
        this.openShiftService.getProjectService(this.projectName, this.routeData.spec.to.name).subscribe(
          data => {
            // Note - shoddy error handling
            if (data.error) {
              console.log('Error retrieving OpenShift Service: ' + data.error);
              return;
            }

            // Add the initial service to services[], then use it to find its service dependencies
            this.services.push(data);

            for (const serviceDependency of data.metadata.annotations.dependencies) {
              this.openShiftService.getProjectService(this.projectName, serviceDependency.name).subscribe(
                data => {
                  // Note - shoddy error handling
                  if (data.error) {
                    console.log('Error retrieving OpenShift Service: ' + data.error);
                    return;
                  }

                  this.services.push(data);

                  // TEMP
                  this.loading = false;
                }
              );
            }
          }
        );
      },
      error => {
        console.log('Error retrieving OpenShift route: ' + error);
      }
    );
  }
}
