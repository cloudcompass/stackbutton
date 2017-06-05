import { Component, OnInit } from '@angular/core';
import {OpenShiftService} from "../_models/openshiftService";

@Component({
  selector: 'app-openshift-service',
  templateUrl: './openshift-service.component.html',
  styleUrls: ['./openshift-service.component.css']
})
export class OpenshiftServiceComponent implements OnInit {
  private hasData: boolean;

  private data; // TEMP
  private name: string;

  constructor() {
    this.hasData = false;

    this.data = {
      "apiVersion": "v1",
      "kind": "Service",
      "metadata": {
        "annotations": {
          "openshift.io/generated-by": "OpenShiftNewApp"
        },
        "creationTimestamp": "2017-05-29T03:09:33Z",
        "labels": {
          "app": "elasticsearch"
        },
        "name": "elasticsearch",
        "namespace": "eclipse-kapua",
        "resourceVersion": "1092",
        "selfLink": "/api/v1/namespaces/eclipse-kapua/services/elasticsearch",
        "uid": "3d826e71-441c-11e7-80fe-e2104ab5c22e"
      },
      "spec": {
        "clusterIP": "172.30.194.195",
        "ports": [
          {
            "name": "http",
            "port": 9200,
            "protocol": "TCP",
            "targetPort": 9200
          },
          {
            "name": "transport",
            "port": 9300,
            "protocol": "TCP",
            "targetPort": 9300
          }
        ],
        "selector": {
          "app": "elasticsearch",
          "deploymentconfig": "elasticsearch"
        },
        "sessionAffinity": "None",
        "type": "ClusterIP"
      },
      "status": {
        "loadBalancer": {}
      }
    };

  }

  ngOnInit() {
    this.populateServiceData(this.data);
  }

  populateServiceData(serviceData: OpenShiftService) {
    this.hasData = true;
    this.name = serviceData.metadata.name;
  }

}
