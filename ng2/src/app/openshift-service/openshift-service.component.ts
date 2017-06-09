import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftServiceModel } from '../_models/openshiftService';
import { OpenShiftPod } from '../_models/openshiftPod';
import { OpenShiftService } from '../_services/openshift.service';

import 'rxjs/add/operator/mergemap'; // For flatMap

@Component({
  selector: 'app-openshift-service',
  templateUrl: './openshift-service.component.html',
  styleUrls: ['./openshift-service.component.css']
})
export class OpenshiftServiceComponent implements OnInit {
  serviceData: OpenShiftServiceModel;
  podName: string;

  @Input() projectName: string;
  @Input() name: string;

  private hasData: boolean;

  private serviceName: string;

  constructor(private openShiftService: OpenShiftService) {
    this.hasData = false;
  }

  ngOnInit() {
    // this.serviceName = this.serviceData.metadata.name;
    // console.log(this.serviceName);

    this.openShiftService.getProjectService(this.projectName, this.name).subscribe(
      data => {
        this.hasData = true;
        console.log('servicedata: ' + data);

        this.serviceData = data;
        this.serviceName = this.serviceData.metadata.name;
        this.podName = this.serviceName;
      },
      error => {
        console.log('osgetServe error: ' + error);
      }
    );
  }

}
