import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
/**
 * The OpenShift Service allows the user to retrieve OpenShift project information, as well as a specific route,
 * service, or pod within a given project.
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
   * Retrieve all OpenShift data from a source.
   *
   * Note: This currently only returns sample data. Going forward, this would retrieve the data from MongoDB.
   *
   * @returns {Map<any>}
   */
  getOpenShiftData(): Observable<any> {
    return this.http
      .get('assets/sampleData/openshift-sample-data.json')
      .map(res => res.json());
  }

  /**
   * Attempt to retrieve a specific project by name.
   *
   * Note: It would make sense to have this check for a local copy first, then to use getOpenShiftData() if necessary
   *
   * @param projectName
   * @returns {Map<any>}
   */
  getOpenShiftProject(projectName: string): Observable<any> {
    // console.log('getOpenShiftProject: ' + projectName);

    // Retrieve project data, then look for the project by name, then return it
    return this.http
      .get('assets/sampleData/openshift-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (project.project === projectName) return project;
        }

        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' + projectName };
      });
  }

  /**
   * Attempt to retrieve a specific service from a specific project by name
   *
   * Note: It would make sense to have this check for a local copy first, then to use getOpenShiftData() if necessary
   *
   * @param projectName
   * @param serviceName
   * @returns {Map<any>}
   */
  getProjectService(projectName: string, serviceName: string): Observable<any> {
    // console.log('getProjectService: ' + projectName + ' : ' + serviceName);

    // Retrieve project data, look for the project by name, then the service by name, then return it
    return this.http
      .get('assets/sampleData/openshift-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (project.project === projectName) {
            for (const item of project.items) {
              if (item.kind === 'Service') {
                if (item.metadata.name === serviceName) return item;
              }
            }

            // No service found, return error
            // Note: Shoddy error-handling
            return { 'error': 'Service not found in project items: ' + serviceName };
          }
        }

        // No project found, return error
        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' + projectName };
      });
  }

  /**
   * Attempt to retrieve a specific pod from a specific project by name
   *
   * Note: It would make sense to have this check for a local copy first, then to use getOpenShiftData() if necessary
   *
   * @param projectName
   * @param podName
   * @returns {Map<any>}
   */
  getProjectPod(projectName: string, podName: string): Observable<any> {
    // console.log('getProjectPod: ' + projectName + ' : ' + podName);

    // Retrieve project data, look for the project by name, then the pod by name, then return it
    return this.http
      .get('assets/sampleData/openshift-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (project.project === projectName) {
            for (const item of project.items) {
              if (item.kind === 'Pod') {
                if (item.metadata.labels.app === podName) return item;
              }
            }

            // No pod found, return error
            // Note: Shoddy error-handling
            return { 'error': 'Pod not found in project items: ' + podName };
          }
        }

        // No project found, return error
        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' + projectName };
      });
  }

  /**
   * Attempt to retrieve a specific route from a specific project by name
   *
   * Note: It would make sense to have this check for a local copy first, then to use getOpenShiftData() if necessary
   *
   * @param projectName
   * @param routeName
   * @returns {Map<any>}
   */
  getProjectRoute(projectName: string, routeName: string): Observable<any> {
    // console.log('getProjectRoute: ' + projectName + ' : ' + routeName);

    // Retrieve project data, look for the project by name, then the route by name, then return it
    return this.http
      .get('assets/sampleData/openshift-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (project.project === projectName) {
            for (const item of project.items) {
              if (item.kind === 'Route') {
                if (item.metadata.name === routeName) return item;
              }
            }

            // No route found, return error
            // Note: Shoddy error-handling
            return { 'error': 'Route not found in project items: ' + routeName };
          }
        }

        // No project found, return error
        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' + projectName };
      });
  }
}
