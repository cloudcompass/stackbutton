import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftRouteModel } from '../_models/openshiftRouteModel';
import { OpenShiftServiceModel } from '../_models/openshiftServiceModel';
import {OpenShiftService} from '../_services/openshift.service';

@Component({
  selector: 'app-openshift-route',
  templateUrl: './openshift-route.component.html',
  styleUrls: ['./openshift-route.component.css']
})
/**
 * Queries the OpenShift Service to populate variables to display
 *
 * Note: This queries the service multiple times. Once for the route data, then for the service tied to the route,
 * then again to get that service's service dependencies.
 *
 * ///////////////
 * // Dev Note //
 * //////////////
 *
 * The loading boolean should be used as a holdover until every service is populate for this route.
 * As it is now, it stop loading prematurely, but not horribly. Look into either properly chaining subscribes.
 * Or, better yet, look into forkjoining observables: https://www.learnrxjs.io/operators/combination/forkjoin.html
 */
export class OpenshiftRouteComponent implements OnInit {
  // Inputs used to query the OpenShiftService
  @Input() name: string;
  @Input() projectName: string;

  private routeData: OpenShiftRouteModel;

  // Data to display
  private loading: boolean;
  private appName: string;
  private host: string;
  private services: OpenShiftServiceModel[];

  // Testing
  private isCollapsed: boolean;

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {
    this.loading = true;
    this.services = [];

    this.isCollapsed = false;

    // First, query the service to populate the router information
    this.openShiftService.getProjectRoute(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

        // Set component variables based on retrieved data
        this.routeData = data;
        this.appName = this.routeData.metadata.labels.app;
        this.host = this.routeData.spec.host;

        // Query the Service for the service that's tied to this router
        this.openShiftService.getProjectService(this.projectName, this.routeData.spec.to.name).subscribe(
          data => {
            // Note - shoddy error handling
            if (data.error) {
              console.log('Error retrieving OpenShift Service: ' + data.error);
              return;
            }

            // Add the initial service to services[], then use it to find its service dependencies
            this.services.push(data);

            // For each dependency in the main service, query the Service to retrieve it
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

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
