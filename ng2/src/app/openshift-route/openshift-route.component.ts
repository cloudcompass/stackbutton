import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftServiceModel } from '../_models/openshiftService';

@Component({
  selector: 'app-openshift-route',
  templateUrl: './openshift-route.component.html',
  styleUrls: ['./openshift-route.component.css']
})
export class OpenshiftRouteComponent implements OnInit {
  @Input() routeData: OpenShiftRoute;
  @Input() mainService: OpenShiftServiceModel;

  private data: any;
  private hasData: boolean;
  private appName: string;
  private host: string;

  private services: OpenShiftServiceModel[];
  private serviceNames: string[];

  constructor() {
    this.hasData = false;
  }

  ngOnInit() {
    this.hasData = true;

    this.hasData = true;
    this.appName = this.routeData.metadata.labels.app;
    this.host = this.routeData.spec.host;

    this.services = [];
    this.services.push(this.mainService);

    this.serviceNames = [];
    this.serviceNames.push(this.mainService.metadata.name);

    if (this.mainService) {
      if (this.mainService.metadata.annotations.dependencies) {
        for (const dependentService of this.mainService.metadata.annotations.dependencies) {
          console.log('depserv: ' + dependentService.name);
          this.serviceNames.push(dependentService.name);
        }
      }
    }
  }
}
