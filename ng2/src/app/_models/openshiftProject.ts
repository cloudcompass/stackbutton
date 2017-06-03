/**
 * Created by Garmonz on 2017-06-03.
 */
import { OpenShiftPod } from './openshiftPod';
import { OpenShiftService } from '../_services/openshift.service';
import { OpenShiftRoute } from './openshiftRoute';

export class OpenShiftProject {
  project: string;
  members: {
    name: string;
    role: string;
    uuid: string;
  }[];
  apiVersion: string;
  items: {
    // Route, Service, Pod
    // item: OpenShiftRoute | OpenShiftService | OpenShiftPod;
  }[];
  kind: string;
  metaData: {};
  resourceVersion: string;
  selfLink: string;
}
