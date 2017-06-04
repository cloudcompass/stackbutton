/**
 * Version 1 of OpenShift/Kubernetes Service API Structure
 *
 * Note: The Majority of the comments (// ObjectMeta) denote the class definition outlined in the api documentation
 * The idea was to model these and fit them in at a later time
 */
export class OpenShiftService {
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
  secrets: any[]; // ObjectReference
  imagePullSecrets: any[]; // LocalObjectReference

  // What
  spec: {
    ports: {
      name: string;
      protocol: string;
      port: number;
      targetPort: string;
      nodePort: number;
    }[]; // ServicePort
    selector: any;
    portalIP: string;
    clusterIP: string;
    type: string;
    deprecatedPublicIPs: string[];
    sessionAffinity: string;
  }; // ServiceSpec
  status: {
    loadBalancer: {
      ingress: {
        ip: string;
        hostname: string;
      }[]; // LoadBalancerIngress
    }; // LoadBalancerStatus
  }; // ServiceStatus
}
