import { Component, Input, OnInit } from '@angular/core';
import { OpenShiftPod } from '../_models/openshiftPod';
import { OpenShiftContainer } from '../_models/openshiftContainer';

@Component({
  selector: 'app-openshift-pod',
  templateUrl: './openshift-pod.component.html',
  styleUrls: ['./openshift-pod.component.css']
})
export class OpenshiftPodComponent implements OnInit {
  private data: any;

  private hasData: boolean;
  private deploymentConfig: string;
  private creationTimestamp: Date; // TODO: Show days since creation
  private daysSinceCreation: number;
  private containers: any[];

  constructor() {
    this.hasData = false;

    this.data = {
      "apiVersion": "v1",
      "kind": "Pod",
      "metadata": {
        "annotations": {
          "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicationController\",\"namespace\":\"eclipse-kapua\",\"name\":\"elasticsearch-1\",\"uid\":\"3d188e0a-441c-11e7-80fe-e2104ab5c22e\",\"apiVersion\":\"v1\",\"resourceVersion\":\"20900\"}}\n",
          "openshift.io/deployment-config.latest-version": "1",
          "openshift.io/deployment-config.name": "elasticsearch",
          "openshift.io/deployment.name": "elasticsearch-1",
          "openshift.io/generated-by": "OpenShiftNewApp",
          "openshift.io/scc": "restricted"
        },
        "creationTimestamp": "2017-06-01T16:03:50Z",
        "generateName": "elasticsearch-1-",
        "labels": {
          "app": "elasticsearch",
          "deployment": "elasticsearch-1",
          "deploymentconfig": "elasticsearch",
          "hawkular-openshift-agent": "jolokia-kapua"
        },
        "name": "elasticsearch-1-bsjsp",
        "namespace": "eclipse-kapua",
        "resourceVersion": "20966",
        "selfLink": "/api/v1/namespaces/eclipse-kapua/pods/elasticsearch-1-bsjsp",
        "uid": "e7312244-46e3-11e7-b973-92b4c9772184"
      },
      "spec": {
        "containers": [
          {
            "command": [
              "elasticsearch",
              "-Etransport.host=_site_",
              "-Ecluster.name=kapua-datastore",
              "-Ediscovery.type=single-node"
            ],
            "env": [
              {
                "name": "ES_JAVA_OPTS",
                "value": "-Xms512m -Xmx512m"
              }
            ],
            "image": "elasticsearch:5.4",
            "imagePullPolicy": "Always",
            "name": "elasticsearch",
            "ports": [
              {
                "containerPort": 9200,
                "protocol": "TCP"
              },
              {
                "containerPort": 9300,
                "protocol": "TCP"
              }
            ],
            "readinessProbe": {
              "failureThreshold": 3,
              "httpGet": {
                "path": "/",
                "port": 9200,
                "scheme": "HTTP"
              },
              "initialDelaySeconds": 15,
              "periodSeconds": 10,
              "successThreshold": 1,
              "timeoutSeconds": 5
            },
            "resources": {},
            "securityContext": {
              "capabilities": {
                "drop": [
                  "KILL",
                  "MKNOD",
                  "SETGID",
                  "SETUID",
                  "SYS_CHROOT"
                ]
              },
              "privileged": false,
              "runAsUser": 1000050000,
              "seLinuxOptions": {
                "level": "s0:c7,c4"
              }
            },
            "terminationMessagePath": "/dev/termination-log",
            "volumeMounts": [
              {
                "mountPath": "/usr/share/elasticsearch/data",
                "name": "elasticsearch-data"
              },
              {
                "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                "name": "default-token-v19gd",
                "readOnly": true
              }
            ]
          }
        ],
        "dnsPolicy": "ClusterFirst",
        "imagePullSecrets": [
          {
            "name": "default-dockercfg-fkmxf"
          }
        ],
        "nodeName": "10.0.75.2",
        "restartPolicy": "Always",
        "securityContext": {
          "fsGroup": 1000050000,
          "seLinuxOptions": {
            "level": "s0:c7,c4"
          }
        },
        "serviceAccount": "default",
        "serviceAccountName": "default",
        "terminationGracePeriodSeconds": 30,
        "volumes": [
          {
            "emptyDir": {},
            "name": "elasticsearch-data"
          },
          {
            "name": "default-token-v19gd",
            "secret": {
              "defaultMode": 420,
              "secretName": "default-token-v19gd"
            }
          }
        ]
      },
      "status": {
        "conditions": [
          {
            "lastProbeTime": null,
            "lastTransitionTime": "2017-06-01T16:03:50Z",
            "status": "True",
            "type": "Initialized"
          },
          {
            "lastProbeTime": null,
            "lastTransitionTime": "2017-06-01T16:04:22Z",
            "status": "True",
            "type": "Ready"
          },
          {
            "lastProbeTime": null,
            "lastTransitionTime": "2017-06-01T16:03:50Z",
            "status": "True",
            "type": "PodScheduled"
          }
        ],
        "containerStatuses": [
          {
            "containerID": "docker://60774a05b7b37d42c8281b350498016830f33cfa709ffd2906f68810eb973740",
            "image": "elasticsearch:5.4",
            "imageID": "docker-pullable://elasticsearch@sha256:b8697c807aa65316714a5074ef039c42e6c4b400a6986c18b9a88ef37636acbc",
            "lastState": {},
            "name": "elasticsearch",
            "ready": true,
            "restartCount": 0,
            "state": {
              "running": {
                "startedAt": "2017-06-01T16:03:54Z"
              }
            }
          }
        ],
        "hostIP": "10.0.75.2",
        "phase": "Running",
        "podIP": "172.17.0.8",
        "startTime": "2017-06-01T16:03:50Z"
      }
    };

  }

  ngOnInit() {
    console.log('populate shit');
    this.populatePodData(this.data);
  }

  populatePodData(podData: OpenShiftPod) {
    console.log('populate pod data: ' + podData);
    console.log(podData.metadata.name);
    this.hasData = true;
    this.deploymentConfig = podData.metadata.labels.deploymentconfig;
    this.creationTimestamp = new Date(podData.metadata.creationTimestamp);
    this.containers = podData.spec.containers;


    this.daysSinceCreation = new Date().getDate() - this.creationTimestamp.getDate();
  }
}
