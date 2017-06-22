import { Component, Input, OnInit } from '@angular/core';
import { OpenShiftPodModel } from '../_models/openshiftPodModel';
import { OpenShiftService } from '../_services/openshift.service';

@Component({
  selector: 'app-openshift-pod',
  templateUrl: './openshift-pod.component.html',
  styleUrls: ['./openshift-pod.component.css']
})
/**
 * Queries the OpenShift Service and grabs the pod information to display
 */
export class OpenshiftPodComponent implements OnInit {
  // Inputs used to query the OpenShiftService
  @Input() name: string;
  @Input() projectName: string;

  private podData: OpenShiftPodModel;

  // Data to display
  private deploymentConfig: string;
  private creationTimestamp: Date;
  private daysSinceCreation: number;
  private containers: any[];

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {
    // Populate the component with data
    this.openShiftService.getProjectPod(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

        // Set component variables based on retrieved data
        this.podData = data;
        this.deploymentConfig = this.podData.metadata.labels.deploymentconfig;
        this.containers = this.podData.spec.containers;
        this.creationTimestamp = new Date(this.podData.metadata.creationTimestamp);
        this.daysSinceCreation = new Date().getDate() - this.creationTimestamp.getDate();
      },
      error => {
        console.log('Error retrieving OpenShift Service: ' + error);
      }
    );
  }
}
