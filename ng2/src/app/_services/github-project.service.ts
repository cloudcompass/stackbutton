import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubProjectService {

  constructor(private http: Http) { }

  /**
   * Retrieve all github projects from a source.
   *
   * Note: This currently only returns sample data. Going forward, this would retrieve the data from MongoDB.
   *
   * @returns {Map<any>}
   */
  getGithubProjects(): Observable<any> {
    return this.http
      .get('assets/sampleData/github-sample-data.json')
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
  getGithubProjectByName(projectName: string): Observable<any> {
    // console.log('getOpenShiftProject: ' + projectName);

    // Retrieve project data, then look for the project by name, then return it
    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (project.project === projectName) return project;
        }

        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' + projectName };
      });
  }

}
