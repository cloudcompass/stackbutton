import { Component, Input, OnInit } from '@angular/core';
import { OpenShiftPod } from '../_models/openshiftPod';
import { OpenShiftContainer } from '../_models/openshiftContainer';

@Component({
  selector: 'app-openshift-pod',
  templateUrl: './openshift-pod.component.html',
  styleUrls: ['./openshift-pod.component.css']
})
export class OpenshiftPodComponent implements OnInit {
  @Input() podData: OpenShiftPod;

  private hasData: boolean;
  private deploymentConfig: string;
  private creationTimestamp: Date; // TODO: Show days since creation
  private daysSinceCreation: number;
  private containers: any[];

  constructor() {
    this.hasData = false;
  }

  ngOnInit() {
    this.hasData = true;
    this.deploymentConfig = this.podData.metadata.labels.deploymentconfig;
    this.creationTimestamp = new Date(this.podData.metadata.creationTimestamp);
    this.containers = this.podData.spec.containers;
    this.daysSinceCreation = new Date().getDate() - this.creationTimestamp.getDate();
  }
}
