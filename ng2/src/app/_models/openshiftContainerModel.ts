/**
 * Version 1 of the OpenShift/Kubernetes Container API structure
 *
 * Note: The Majority of the comments (// EnvVar) denote the class definition outlined in the api documentation
 * The idea was to model these and fit them in at a later time
 */
export class OpenShiftContainerModel {
  name: string;
  image: string;
  command: string[];
  args: string[];
  workingDir: string;
  ports: {
    name: string;
    hostPort: number;
    containerPort: number;
    protocol: string;
    hostIP: string;
  }[]; // ContainerPort
  env: {
    name: string;
    value: string;
    valueFrom: {
      fieldRef: string;
    }; // EnvVarSource
  }[]; // EnvVar
  resources: any; // ResourceRequirements
  volumeMounts: {
    name: string;
    readOnly: boolean;
    mountPath: string;
  }[]; // VolumeMount
  livenessProbe: {
    exec: any; // ExecAction
    httpGet: any; // HTTPGetAction
    tcpSocket: any; // TCPSocketAction
    initialDelaySeconds: number;
    timeoutSeconds: number;
  }; // Probe
  readinessProbe: {
    exec: any; // ExecAction
    httpGet: any; // HTTPGetAction
    tcpSocket: any; // TCPSocketAction
    initialDelaySeconds: number;
    timeoutSeconds: number;
  }; // Probe
  lifecycle: any; // Lifecycle
  terminationMessagePath: string;
  imagePullPolicy: string;
  securityContext: {
    capabilities: any; // Capabilities
    privileged: boolean;
    seLinuxOptions: any; // SELinuxOptions
    runAsUser: number;
    runAsNonRoot: boolean;
  }; // SecurityContext
  stdin: boolean;
  tty: boolean;
}
