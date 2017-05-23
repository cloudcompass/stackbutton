import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { GithubUser } from '../_models/githubUser';
import { GITHUBUSER } from '../sample-data/sample-github-user';

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
   * Get public GithubUser information using the supplied username
   *
   * @param username  The Github username to get
   * @returns {Observable<R|T>} A GitHubUser, if found
   */
  getUserPublic(username: string): Observable<GithubUser> {
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
  getUserPrivate(): Observable<GithubUser> {
    // Setup headers for authorized user get request
    const authToken = '0e425ddfe838c88a0d473b0d07291cdad8ceb4d9'; // TODO - use getLocal('auth_token') to get the token
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
   * Get the local sample GithubUser
   *
   * @returns {any} Sample GithubUser
   */
  getUserSample(): Observable<GithubUser> {
    return Observable.of(GITHUBUSER);
  }

  /**
   * For testing: get local sample githubUser, with a 2 second delay
   *
   * @returns {any} Sample GithubUser
   */
  getUserSampleSlowly(): Observable<GithubUser> {
    return Observable.of(GITHUBUSER).delay(2000);
  }

  /**
   * For testing: Return an observable with an error where a GithubUser is expected
   *
   * @returns {any} Errored Observable
   */
  getUserSampleError(): Observable<GithubUser> {
    return Observable.throw('Get GithubUser Error');
  }
}
