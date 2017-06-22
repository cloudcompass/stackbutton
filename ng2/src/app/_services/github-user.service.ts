import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { GithubUserModel } from '../_models/githubUserModel';

/*
Example usage:

githubUserService.getUserPublic('Username').subscribe(
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
export class GithubUserService {

  private githubAPIUrl: string;

  constructor(private http: Http) {
    this.githubAPIUrl = 'https://api.github.com/';
  }

  /**
   * Get public GithubUserModel information using the supplied username
   *
   * @param username  The Github username to get
   * @returns {Observable<R|T>} A GitHubUser, if found
   */
  getUserPublic(username: string): Observable<GithubUserModel> {
    // Ensure param validity
    if (username == null || username === '') {
      return Observable.throw('Invalid Github username supplied: ' + username);
    }

    // Build the get url based on supplied params, then make and return the request
    const getUrl = this.githubAPIUrl + 'users/' + username;
    console.log('getUserPublic getUrl: ' + getUrl);

    return this.http.get(getUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Use the local Github OAUTH token to attempt to retrieve information of the authenticated user
   *
   * @returns {Observable<R|T>} A GitHubUser, if found
   */
  getUserPrivate(): Observable<GithubUserModel> {
    // Setup headers for authorized user get request
    const authToken = ''; // TODO - use getLocal('auth_token') to get the token
    const headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', 'token ' + authToken);
    const options = new RequestOptions({headers: headers});

    // Build the get url based on supplied params, then make and return the request
    const getUrl = 'https://api.github.com/user';
    console.log('getUserPrivate getUrl: ' + getUrl);

    return this.http.get(getUrl, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Get the local sample GithubUserModel
   *
   * @returns {any} Sample GithubUserModel
   */
  getUserSample(): Observable<GithubUserModel> {
    return this.http
      .get('assets/sampleData/github-user-sample-data.json')
      .map(res => res.json());
  }

  /**
   * For testing: get local sample githubUser, with a 2 second delay
   *
   * @returns {any} Sample GithubUserModel
   */
  getUserSampleSlowly(): Observable<GithubUserModel> {
    return this.http
      .get('assets/sampleData/github-user-sample-data.json')
      .map(res => res.json())
      .delay(2000);
  }

  /**
   * For testing: Return an observable with an error where a GithubUserModel is expected
   *
   * @returns {any} Errored Observable
   */
  getUserSampleError(): Observable<GithubUserModel> {
    return Observable.throw('Get GithubUserModel Error');
  }
}
