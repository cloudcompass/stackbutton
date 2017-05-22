import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
export class GithubUserService {

  private githubUserUrl: string;

  constructor(private http: Http) {
    this.githubUserUrl = 'https://api.github.com/users/';
  }

  /**
   * Get a GithubUser from GitHub using the supplied username
   *
   * @param username  The Github username to get
   * @returns {Observable<R|T>} A GitHubUser, if found
   */
  getUser(username: string): Observable<GithubUser> {
    if (username == null || username === '') {
      return Observable.throw('Invalid Github username supplied: ' + username);
    }

    return this.http.get(this.githubUserUrl + username)
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
