import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftService } from '../_models/openshiftService';
import { OpenShiftPod } from '../_models/openshiftPod';

@Component({
  selector: 'app-openshift-service',
  templateUrl: './openshift-service.component.html',
  styleUrls: ['./openshift-service.component.css']
})
export class OpenshiftServiceComponent implements OnInit {
  @Input() serviceData: OpenShiftService;
  @Input() podData: OpenShiftPod;

  private hasData: boolean;

  private serviceName: string;

  constructor() {
    this.hasData = true;
  }

  ngOnInit() {
    this.serviceName = this.serviceData.metadata.name;
    console.log(this.serviceName);
  }

}
