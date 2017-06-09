import { Component, Input, OnInit } from '@angular/core';
import { OpenShiftPod } from '../_models/openshiftPod';
import { OpenShiftContainer } from '../_models/openshiftContainer';
import {OpenShiftService} from "../_services/openshift.service";

@Component({
  selector: 'app-openshift-pod',
  templateUrl: './openshift-pod.component.html',
  styleUrls: ['./openshift-pod.component.css']
})
export class OpenshiftPodComponent implements OnInit {
  @Input() name: string;
  @Input() projectName: string;

  @Input() podData: OpenShiftPod;

  private hasData: boolean;
  private deploymentConfig: string;
  private creationTimestamp: Date; // TODO: Show days since creation
  private daysSinceCreation: number;
  private containers: any[];

  constructor(private openshiftService: OpenShiftService) {
    this.hasData = false;
  }

  ngOnInit() {
    this.openshiftService.getProjectPod(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handle
        if (data.error) {
          console.log('osspodget error: ' + data.error);
          return;
        }
        this.hasData = true;

        console.log('pod data get: ' + JSON.stringify(data));

        this.podData = data;
        this.deploymentConfig = this.podData.metadata.labels.deploymentconfig;
        this.creationTimestamp = new Date(this.podData.metadata.creationTimestamp);
        this.containers = this.podData.spec.containers;
        this.daysSinceCreation = new Date().getDate() - this.creationTimestamp.getDate();
      },
      error => {
        console.log('osspodget error: ' + error);
      }
    );

  }
}
