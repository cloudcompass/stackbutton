import { Component, OnInit } from '@angular/core';
import {OpenShiftRoute} from "../_models/openshiftRoute";

@Component({
  selector: 'app-openshift-route',
  templateUrl: './openshift-route.component.html',
  styleUrls: ['./openshift-route.component.css']
})
export class OpenshiftRouteComponent implements OnInit {

  private data: any;
  private hasData: boolean;
  private appName: string;
  private host: string;

  constructor() {
    this.hasData = false;

    this.data = {
      "apiVersion": "v1",
      "kind": "Route",
      "metadata": {
        "annotations": {
          "openshift.io/generated-by": "OpenShiftNewApp",
          "openshift.io/host.generated": "true"
        },
        "creationTimestamp": "2017-05-29T03:09:34Z",
        "labels": {
          "app": "kapua-api"
        },
        "name": "api",
        "namespace": "eclipse-kapua",
        "resourceVersion": "1103",
        "selfLink": "/oapi/v1/namespaces/eclipse-kapua/routes/api",
        "uid": "3da31ad8-441c-11e7-80fe-e2104ab5c22e"
      },
      "spec": {
        "host": "api-eclipse-kapua.10.0.75.2.xip.io",
        "port": {
          "targetPort": "http"
        },
        "to": {
          "kind": "Service",
          "name": "kapua-api",
          "weight": 100
        },
        "wildcardPolicy": "None"
      },
      "status": {
        "ingress": [
          {
            "conditions": [
              {
                "lastTransitionTime": "2017-05-29T03:09:34Z",
                "status": "True",
                "type": "Admitted"
              }
            ],
            "host": "api-eclipse-kapua.10.0.75.2.xip.io",
            "routerName": "router",
            "wildcardPolicy": "None"
          }
        ]
      }
    };

  }

  ngOnInit() {
    this.populateRouteData(this.data);
  }

  populateRouteData(routeData: OpenShiftRoute) {
    this.hasData = true;
    this.appName = routeData.metadata.labels.app;
    this.host = routeData.spec.host;
  }
}
