import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { OpenShiftProject } from '../_models/openshiftProject';
import { OpenShiftServiceModel } from '../_models/openshiftService';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {OpenShiftPod} from "../_models/openshiftPod";


@Injectable()
/**
 *
 *
 * ///////////////
 * // Dev notes //
 * ///////////////
 *
 * So, preferably, retrieving specific OpenShift Routes/Services/Pods would involve calling getOpenShiftData()
 * first, subscribing, then parsing that data and returning what you're after. Look into chaining Observables maybe if
 * you're interested in making it work better, or storing the first getOpenShiftData in cache and accessing it there, or
 * reworking the entire logic here. It's serviceable, but chances are it'll be hard to maintain, and hard to extend.
 *
 * Also, note that error handling on the map() functions is done incorrectly (I'm assuming).
 * Look into returning your own custom Response objects maybe, instead of returning a lame json string.
 */
export class OpenShiftService {

  constructor(private http: Http) { }

  /**
   *
   * @returns {Map<any>}
   */
  getOpenShiftData(): Observable<any> {
    return this.http
      .get('assets/sampleData/sample-openShift-data.json')
      .map(res => res.json());
  }

  /**
   *
   * @param projectName
   * @returns {Map<any>}
   */
  getOpenShiftProject(projectName: string): Observable<any> {
    return this.http
      .get('assets/sampleData/sample-openShift-data.json')
      .map(res => {
        const data = res.json();

        for (const project of data) {
          if (project.project === projectName) return project;
        }

        // Hey, this is obviously bad practice, but it's here for now
        // TODO: Figure out appropriate handling of errors for map(). Look into custom Response objects maybe? IDK
        return {
          'error': 'Openshift Project name not found: ' + projectName
        };

      });
  }

  /**
   *
   * @param projectName
   * @param serviceName
   * @returns {Map<any>}
   */
  getProjectService(projectName: string, serviceName: string): Observable<any> {
    return this.http
      .get('assets/sampleData/sample-openShift-data.json')
      .map(res => {
        const data = res.json();

        for (const project of data) {
          if (project.project === projectName) {
            for (const item of project.items) {
              if (item.kind === 'Service') {
                if (item.metadata.name === serviceName) return item;
              }
            }

            // Note: Shoddy error-handling
            return {
              'error': 'No project items found that match type and name: ' + serviceName
            };
          }
        }

        // Note: Shoddy error-handling
        return {
          'error': 'Openshift Project name not found: ' + projectName
        };
      });
  }

  getProjectPod(projectName: string, podName: string): Observable<any> {
    return this.http
      .get('assets/sampleData/sample-openShift-data.json')
      .map(res => {
        const data = res.json();

        for (const project of data) {
          if (project.project === projectName) {
            for (const item of project.items) {
              if (item.kind === 'Pod') {
                if (item.metadata.labels.app === podName) return item;
              }
            }

            // Note: Shoddy error-handling
            return {
              'error': 'No project items found that match type and name: ' + podName
            };
          }
        }

        // Note: Shoddy error-handling
        return {
          'error': 'Openshift Pod name not found: ' + projectName
        };
      });
  }



}
