import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftService } from '../_models/openshiftService';

@Component({
  selector: 'app-openshift-route',
  templateUrl: './openshift-route.component.html',
  styleUrls: ['./openshift-route.component.css']
})
export class OpenshiftRouteComponent implements OnInit {
  @Input() routeData: OpenShiftRoute;
  @Input() mainService: OpenShiftService;

  private data: any;
  private hasData: boolean;
  private appName: string;
  private host: string;

  private services: OpenShiftService[];

  constructor() {
    this.hasData = false;
  }

  ngOnInit() {
    this.hasData = true;

    this.hasData = true;
    this.appName = this.routeData.metadata.labels.app;
    this.host = this.routeData.spec.host;
  }
}
