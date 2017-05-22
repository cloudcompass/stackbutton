import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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

 githubUserService.getUser('Username').subscribe(
 gitUser => {
 this.ghUser = gitUser;
 console.log(this.ghUser);
 console.log(this.ghUser.login);
 console.log(this.ghUser.name);
 },
 error => {
 console.log('getUser error: ' + error);
 }
 );

 */

@Injectable()
export class GithubIssuesService {

  constructor(private http: Http) { }

  getIssues(): Observable<GithubIssue[]> {
    return;
  }

  /**
   * Get the local sample GithubIssues
   *
   * @returns {any} Sample GithubIssues
   */
  getIssuesSample(): Observable<GithubIssue[]> {
    return Observable.of(GITHUBISSUES);
  }

  /**
   * For testing: get local sample GithubIssues, with a 2.5 second delay
   *
   * @returns {any} Sample GithubIssues
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
