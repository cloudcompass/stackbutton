/**
 * Created by Garmonz on 2017-06-02.
 */
export class OpenShiftService {
  apiVersion: string;
  kind: string;
  metadata: {
    // annotations
    creationTimestamp: string;
    labels: {
      app: string;
    };
    name: string;
    namespace: string;
    resourceVersion: string;
    selfLink: string;
    uid: string;
  };
  spec: {
    clusterIP: string;
    ports: {
      name: string;
      port: number;
      protocol: string;
      targetPort: number;
    }[];
    selector: {
      app: string;
      deploymentconfig: string;
    };
    sessionAffinity: string;
    type: string;
  };
  status: {
    loadBalancer: {};
  };
}
