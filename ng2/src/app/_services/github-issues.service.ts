import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { GithubIssue } from '../_models/githubIssue';
import { GITHUBISSUES } from '../sample-data/sample-github-issues';

/*
 Example usage:

 this.getRepoIssues('C3ICapstone', 'stackbutton').subscribe(
   res => {
     console.log('got issues: ' + res.length);
     if (res.length > 0) {
       console.log(res[0].id);
       console.log(res[0].title);
       console.log(res[0].body);
     }
     else console.log('no issues found');
   },
   error => {
     console.log('got issues error');
     console.log(error);
   }
 );

 */

@Injectable()
export class GithubIssuesService {

  private githubAPIUrl: string;

  constructor(private http: Http) {
    console.log('git issues constr');

    this.githubAPIUrl = 'https://api.github.com/';
  }

  /**
   * Returns an array of GithubIssues for a given repo
   *
   * @param ownerName Owner of the repo
   * @param repoName  Name of the repo
   * @returns {any} Array of GithubIssues, if any
   */
  getRepoIssues(ownerName: string, repoName: string): Observable<GithubIssue[]> {
    // Ensure param validity
    if (ownerName == null || ownerName === '') {
      return Observable.throw('Invalid Github owner name supplied: ' + ownerName);
    }
    if (repoName == null || repoName === '') {
      return Observable.throw('Invalid Github repo name supplied: ' + repoName);
    }

    // Testing
    ownerName = 'C3ICapstone';
    repoName = 'stackbutton';

    // Build the get url, then make and return the request
    const getUrl = this.githubAPIUrl + 'repos/' + ownerName + '/' + repoName + '/issues';
    console.log('getRepoIssues getUrl: ' + getUrl);

    return this.http.get(getUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * List all issues across owned and member repositories assigned to the authenticated user
   *
   * @param orgName (Optional) If given, function returns all issues for a given organization assigned to the user
   * @returns {Observable<R|T>} Array of GithubIssues, if any
   */
  getAuthUserIssues(orgName?: string): Observable<GithubIssue[]>  {
    // Setup headers for authorized user get request
    const authToken = ''; // TODO - use getLocal('auth_token') to get the token
    const headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', 'token ' + authToken);
    const options = new RequestOptions({headers: headers});

    // Build the get url based on supplied params, then make and return the request
    let getUrl = this.githubAPIUrl;
    if (orgName) {
      // Ensure param validity
      if (orgName === '') return Observable.throw('Invalid org name supplied: ' + orgName);
      getUrl += 'orgs/' + orgName + '/issues';
    }
    else getUrl += 'user/issues';
    console.log('getAuthUserIssues getUrl: ' + getUrl);

    return this.http.get(getUrl, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Retrieve a single GithubIssue
   *
   * @param ownerName Issue owner's name
   * @param repoName  Issue repo name
   * @param issueNumber Issue number
   * @returns {Observable<R|T>} A GithubIssue, if any
   */
  getIssue(ownerName: string, repoName: string, issueNumber: number): Observable<GithubIssue> {
    // Ensure param validity
    if (ownerName == null || ownerName === '') {
      return Observable.throw('Invalid Github owner name supplied: ' + ownerName);
    }
    if (repoName == null || repoName === '') {
      return Observable.throw('Invalid Github repo name supplied: ' + repoName);
    }
    if (issueNumber == null || issueNumber <= 0) {
      return Observable.throw('Invalid Github issue number supplied: ' + issueNumber);
    }

    // Testing
    ownerName = 'C3ICapstone';
    repoName = 'stackbutton';
    issueNumber = 1;

    // Build the get url based on supplied params, then make and return the request
    const getUrl = this.githubAPIUrl + 'repos/' + ownerName + '/' + repoName + '/issues/' + issueNumber;
    console.log('getIssue getUrl: ' + getUrl);

    return this.http.get(getUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Get the local sample GithubIssues
   *
   * @returns {any} Array of sample GithubIssues
   */
  getIssuesSample(): Observable<GithubIssue[]> {
    return Observable.of(GITHUBISSUES);
  }

  /**
   * For testing: get local sample GithubIssues, with a 2.5 second delay
   *
   * @returns {any} Array of sample GithubIssues
   */
  getIssuesSampleSlowly(): Observable<GithubIssue[]> {
    return Observable.of(GITHUBISSUES).delay(2500);
  }

  /**
   * For testing: Return an observable with an error where a GithubUser is expected
   *
   * @returns {any} Errored Observable
   */
  getIssuesSampleError(): Observable<GithubIssue[]> {
    return Observable.throw('Get GithubIssues Error');
  }
}
