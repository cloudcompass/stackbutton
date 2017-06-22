import { OpenShiftContainerModel } from './openshiftContainerModel';

/**
 * Version 1 of the OpenShift/Kubernetes Pod API structure, plus some additions
 *
 * Note: The Majority of the comments (// ObjectMeta) denote the class definition outlined in the api documentation
 * The idea was to model these and fit them in at a later time
 */
export class OpenShiftPodModel {
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
    volumes: any[]; // Volume
    containers: OpenShiftContainerModel[];
    restartPolicy: string;
    terminationGracePeriodSeconds: number;
    activeDeadlineSeconds: number;
    dnsPolicy: string;
    nodeSelector: any;
    host: string;
    serviceAccountName: string;
    serviceAccount: string;
    nodeName: string;
    imagePullSecrets: any[]; // LocalObjectReference
    // TODO: securityContext not seen in official API?
    securityContext: {
      fsGroup: number;
      seLinuxOptions: {
        level: string;
      }
    };
  }; // PodSpec
  status: {
    phase: string;
    conditions: {
      type: string; // Seen: Initialized, Ready, PodScheduled
      status: string;
      // Not in Kubernetes doc
      lastProbeTime: any; // string? only saw null
      lastTransitionTime: string;
    }[]; // PodCondition
    message: string;
    reason: string;
    hostIP: string;
    podIP: string;
    startTime: string;
    containerStatuses: {
      name: string;
      state: {
        waiting: {
          reason: string;
        }; // ContainerStateWaiting
        running: {
          startedAt: string;
        }; // ContainerStateRunning
        terminated: {
          exitCode: number;
          signal: number;
          reason: string;
          message: string;
          startedAt: string;
          finishedAt: string;
          containerID: string;
        }; // ContainerStateWaiting
      }; // ContainerState
      lastState: {
        waiting: {
          reason: string;
        }; // ContainerStateWaiting
        running: {
          startedAt: string;
        }; // ContainerStateRunning
        terminated: {
          exitCode: number;
          signal: number;
          reason: string;
          message: string;
          startedAt: string;
          finishedAt: string;
          containerID: string;
        }; // ContainerStateWaiting
      }; // ContainerState
      ready: boolean;
      restartCount: number;
      image: string;
      imageID: string;
      containerID: string;
    }[]; // ContainerStatus
  }; // PodStatus
}
