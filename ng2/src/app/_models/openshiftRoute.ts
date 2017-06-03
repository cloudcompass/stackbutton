/**
 * Created by Garmonz on 2017-06-02.
 */
export class OpenShiftRoute {
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
    host: string;
    port: {
      targetPort: string;
    };
    to: {
      kind: string;
      name: string;
      weight: number;
    };
    wildcardPolicy: string;
  };
  status: {
    ingress: {
      conditions: {
        lastTransitionTime: string;
        status: string;
        type: string;
      }[];
      host: string;
      routerName: string;
      wildcardPolicy: string;
    }[];
  };
}
