import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftServiceModel } from '../_models/openshiftServiceModel';
import { OpenShiftService } from '../_services/openshift.service';

@Component({
  selector: 'app-openshift-service',
  templateUrl: './openshift-service.component.html',
  styleUrls: ['./openshift-service.component.css']
})
/**
 * Queries the OpenShift Service and grabs the service information to display
 *
 * Note: Not to be confused with OpenShiftService
 */
export class OpenshiftServiceComponent implements OnInit {
  // Inputs used to query the OpenShiftService
  @Input() projectName: string;
  @Input() name: string;

  private serviceData: OpenShiftServiceModel;

  // Data to display
  private serviceName: string;
  private podName: string;

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {
    // Populate the component with data
    this.openShiftService.getProjectService(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

        // Set component variables based on retrieved data
        this.serviceData = data;
        this.serviceName = this.serviceData.metadata.name;
        this.podName = this.serviceName;
      },
      error => {
        console.log('Error retrieving OpenShift Service: ' + error);
      }
    );
  }
}
