import { Component, Input, OnInit } from '@angular/core';
import { OpenShiftPod } from '../_models/openshiftPod';
import { OpenShiftService } from '../_services/openshift.service';

@Component({
  selector: 'app-openshift-pod',
  templateUrl: './openshift-pod.component.html',
  styleUrls: ['./openshift-pod.component.css']
})
export class OpenshiftPodComponent implements OnInit {
  @Input() name: string;
  @Input() projectName: string;

  private podData: OpenShiftPod;
  private deploymentConfig: string;
  private creationTimestamp: Date;
  private daysSinceCreation: number;
  private containers: any[];

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {
    this.openShiftService.getProjectPod(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

        this.podData = data;
        this.deploymentConfig = this.podData.metadata.labels.deploymentconfig;
        this.creationTimestamp = new Date(this.podData.metadata.creationTimestamp);
        this.containers = this.podData.spec.containers;
        this.daysSinceCreation = new Date().getDate() - this.creationTimestamp.getDate();
      },
      error => {
        console.log('Error retrieving OpenShift Service: ' + error);
      }
    );
  }
}
