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

  private githubIssuesUrl: string;

  constructor(private http: Http) {
    console.log('git issues constr');

    this.githubIssuesUrl = 'https://api.github.com/repos/C3ICapstone/stackbutton/issues';

    this.getIssues().subscribe(
      res => {
        console.log('got issues: ' + res.length);
        console.log(JSON.stringify(res));
        console.log(res[0].body);
      },
      error => {
        console.log('got issues error');
        console.log(error);
      }
    );
  }

  getIssues(): Observable<GithubIssue[]> {

    /*
    const authToken = '';
    const headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', 'token ' + authToken);
    console.log(headers);
    const options = new RequestOptions({headers: headers});
    */

    return this.http.get(this.githubIssuesUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
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
