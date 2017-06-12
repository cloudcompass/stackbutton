/**
 * Version 1 of OpenShift's Route API structure
 *
 * Note: The Majority of the comments (// ObjectMeta) denote the class definition outlined in the api documentation
 * The idea was to model these and fit them in at a later time
 */
export class OpenShiftRouteModel {
  kind: string;
  apiVersion: string;
  metadata: {
    name: string;
    generateName: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    deletionTimestamp: string;
    labels: any;
    annotations: any;
  }; // ObjectMeta
  spec: {
    host: string;
    path: string;
    to: {
      kind: string;
      namespace: string;
      name: string;
      uid: string;
      apiVersion: string;
      resourceVersion: string;
      fieldPath: string;
      // TODO: Addition?
      weight: number;
    }; // ObjectReference
    tls: any; // TLSConfig

    // TODO: Additions?
    port: {
      targetPort: string;
    };
    wildcardPolicy: string;
  }; // RouteSpec
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
  }; // RouteStatus -- had no official documentation
}
