/**
 * Created by Garmonz on 2017-06-02.
 */
export class OpenShiftPod {
  apiVersion: string;
  kind: string; // Seen: Route, Pod, Service
  metadata: {
    // annotations
    creationTimestamp: string;
    generateName: string;
    labels: {
      app: string;
      deployment: string;
      deploymentconfig: string;
      'hawkular-openshift-agent': string;
    };
    name: string;
    namespace: string;
    resourceVersion: string;
    selfLink: string;
    uid: string;
  }; // End metadata
  spec: {
    containers: {
      command: string[];
      env: {
        name: string;
        value: string;
      }[];
      image: string;
      imagePullPolicy: string; // Seen: Always
      name: string;
      ports: {
        containerPort: number;
        protocol: string;
      }[];
      readinessProbe: {
        failureThreshold: number;
        httpGet: {
          path: string;
          port: number;
          scheme: string;
        };
        initialDelaySeconds: number;
        periodSeconds: number;
        successThreshold: number;
        timeoutSeconds: number;
      };
      resources: {};
      securityContext: {
        capabilities: {
          drop: string[];
        };
        privileged: boolean;
        runAsUser: number;
        setLinuxOptions: {
          level: string;
        };
      };
      terminationMessagePath: string;
      volumeMounts: {
        mountPath: string;
        name: string;
        readOnly: boolean;
      }[];
    }[]; // End containers
    dnsPolicy: string;
    imagePullSecrets: {
      name: string;
    }[];
    nodeName: string;
    restartPolicy: string;
    securityContext: {
      fsGroup: number;
      seLinuxOptions: {
        level: string;
      }
    };
    serviceAccount: string;
    serviceAccountName: string;
    terminationGracePeriodSeconds: number;
    volumes: {
      emptyDir: {};
      name: string;
      secret: {
        defaultMode: number;
        secretName: string;
      }
    }[];
  }; // End spec
  status: {
    conditions: {
      lastProbeTime: any; // string? only saw null
      lastTransitionTime: string;
      status: string;
      type: string; // Seen: Initialized, Ready, PodScheduled
    }[];
    containerStatuses: {
      containerID: string;
      image: string;
      imageID: string;
      lastState: {};
      name: string;
      ready: boolean;
      restartCount: number;
      state: {
        running: {
          startedAt: string;
        }
      }
    }[];
      hostIP: string;
      phase: string; // Seen: running
      podIP: string;
      startTime: string;
  }; // End status
}
