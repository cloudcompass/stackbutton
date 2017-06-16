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
  getAllGithubProjects(): Observable<any> {
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

  getGithubProjectsByName(namesArray: string[]): Observable<any> {
    console.log('get ghp by names: ' + namesArray);

    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        const retVal: any[] = [];

        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (namesArray.indexOf(project.project) > -1) {
            console.log('found match: ' + project.project);
            retVal.push(project);
          }
        }

        console.log('retval: ' + retVal);
        if (retVal) return retVal;

        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' };
      });
  }

  getGithubCommit(sha: string): Observable<any> {
    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          for (const item of project.items) {
            if (item.kind === 'commit') {
              if (item.sha === sha) return item;
            }
          }
        }

        // Note: Shoddy error-handling
        return { 'error': 'Github Commit sha not found: ' + sha };
      });
  }

  getGithubCommits(shaArray: string[]): Observable<any> {
    if (!shaArray || shaArray.length < 0) return Observable.throw('Invalid shaArray supplied: ' + shaArray);

    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        const foundCommits: any[] = [];

        // Convert the response to json before parsing
        for (const project of res.json()) {
          for (const item of project.items) {
            if (item.kind === 'commit') {
              if (shaArray.indexOf(item.sha) > -1) {
                console.log('found sha: ' + item.sha);
                foundCommits.push(item);
              }
            }
          }
        }

        if (foundCommits) return foundCommits;

        // Note: Shoddy error-handling
        return { 'error': 'Github Commit sha not found: '};
      });
  }

  getGithubIssueByID(id: number): Observable<any> {
    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        // Convert the response to json before parsing
        for (const project of res.json()) {
          for (const item of project.items) {
            if (item.kind === 'issue') {
              if (item.id === id) return item;
            }
          }
        }

        // Note: Shoddy error-handling
        return { 'error': 'Github Issue ID not found: ' + id};
      });
  }
}
