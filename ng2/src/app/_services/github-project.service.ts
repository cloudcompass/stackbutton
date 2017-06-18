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
   * Note: It would make sense to have this check for a local copy first, then to use getOpenShiftData() if necessary
   *
   * @param projectName
   * @returns {Map<any>}
   */
  getGithubProjectByName(projectName: string): Observable<any> {
    if (!projectName || projectName === '') return Observable.throw('Invalid projectName supplied: ' + projectName);

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

  /**
   * Retrieve multiple github projects using the supplied names array
   *
   * @param namesArray
   * @returns {Observable<R>}
   */
  getGithubProjects(namesArray: string[]): Observable<any> {
    if (!namesArray || namesArray === []) return Observable.throw('Invalid namesArray supplied: ' + namesArray);

    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        const retVal: any[] = [];

        // Convert the response to json before parsing
        for (const project of res.json()) {
          if (namesArray.indexOf(project.project) > -1) {
            retVal.push(project);
          }
        }

        if (retVal) return retVal;

        // Note: Shoddy error-handling
        return { 'error': 'OpenShift Project name not found: ' };
      });
  }

  /**
   * Retrieve a single github commit using the supplied sha
   *
   * @param sha
   * @returns {Observable<R>}
   */
  getGithubCommit(sha: string): Observable<any> {
    if (!sha || sha === '') return Observable.throw('Invalid sha supplied: ' + sha);

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

  /**
   * Retrieve github commits using a supplied sha array
   *
   * @param shaArray
   * @returns {any}
   */
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

  /**
   * Retrieve a single github issue by id
   * TODO: Issue ID isn't actually unique, but probably would be if the project name was factored in
   *
   * @param id
   * @returns {Observable<R>}
   */
  getGithubIssueByID(id: number): Observable<any> {
    if (!id || id < 0) return Observable.throw('Invalid id supplied: ' + id);

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

  /**
   * Retrieve multiple issues using a supplied issue id array
   * TODO: Issue ID isn't actually unique, but probably would be if the project name was factored in
   *
   * @param idArray
   * @returns {Observable<R>}
   */
  getGithubIssues(idArray: number[]): Observable<any> {
    if (!idArray || idArray === []) return Observable.throw('Invalid idArray supplied: ' + idArray);

    return this.http
      .get('assets/sampleData/github-sample-data.json')
      .map(res => {
        const retVal: any = [];

        // Convert the response to json before parsing
        for (const project of res.json()) {
          for (const item of project.items) {
            if (item.kind === 'issue') {
              if (idArray.indexOf(item.id) > -1) retVal.push(item);
            }
          }
        }

        if (retVal) return retVal;

        // Note: Shoddy error-handling
        return { 'error': 'Github Issue ID not found'};
      });
  }
}
