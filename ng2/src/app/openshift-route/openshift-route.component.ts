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

  private routeData: OpenShiftRoute;

  private appName: string;
  private host: string;

  private services: OpenShiftServiceModel[];
  private serviceNames: string[];

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {

    this.openShiftService.getProjectRoute(this.projectName, this.name).subscribe(
      data => {
        // Get route data
        // Use route data to populate main service - route.spec.to.name
        // Use main service to link service dependencies - service.meta.annotations.dependencies
        // display it in a nice package
      },
      error => {
        console.log('Error retrieving OpenShift route: ' + error);
      }
    );
  }
}
