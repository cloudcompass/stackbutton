import { Component, OnInit, Input } from '@angular/core';
import { OpenShiftServiceModel } from '../_models/openshiftService';
import { OpenShiftService } from '../_services/openshift.service';

@Component({
  selector: 'app-openshift-service',
  templateUrl: './openshift-service.component.html',
  styleUrls: ['./openshift-service.component.css']
})
export class OpenshiftServiceComponent implements OnInit {
  @Input() projectName: string;
  @Input() name: string;

  private loading: boolean;
  private serviceData: OpenShiftServiceModel;
  private serviceName: string;
  private podName: string;

  constructor(private openShiftService: OpenShiftService) { }

  ngOnInit() {

    this.openShiftService.getProjectService(this.projectName, this.name).subscribe(
      data => {
        // Note - shoddy error handling
        if (data.error) {
          console.log('Error retrieving OpenShift Service: ' + data.error);
          return;
        }

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
