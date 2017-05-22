import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GithubCommit } from '../_models/githubCommit';
import { GithubIssue } from '../_models/githubIssue';
import { GithubUser } from '../_models/githubUser';

import { GITHUBCOMMITS } from '../sample-github-commits';
import { GITHUBISSUES } from '../sample-github-issues';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GithubService {

  ghUser: GithubUser;

  constructor(private http: Http) {
    console.log('Github service construct');
    this.getUser('LeeCombs')
      .subscribe(
        gitUser => {
          this.ghUser = gitUser;
          console.log('ghuser success');
          console.log(this.ghUser);
          console.log(this.ghUser.login);
          console.log(this.ghUser.id);
          console.log(this.ghUser.avatar_url);
          console.log(this.ghUser.url);
          console.log(this.ghUser.html_url);
          console.log(this.ghUser.repos_url);
          console.log(this.ghUser.name);
          console.log(this.ghUser.company);
          console.log(this.ghUser.location);
          console.log(this.ghUser.email);
        },
        err => {
          // TODO: Display the error to the user
          console.log('Github getUser error: ' + err);
        }
      );
  }

  getCommits(): Promise<GithubCommit[]> {
    return Promise.resolve(GITHUBCOMMITS);
  }

  getCommitsSample(): GithubCommit[] {
    return GITHUBCOMMITS;
  }

  getIssues(): Promise<GithubIssue[]> {
    return Promise.resolve(GITHUBISSUES);
  }

  getIssuesSample(): GithubIssue[] {
    return GITHUBISSUES;
  }

  getUser(username: string): Observable<GithubUser> {
    console.log('get user');
    return this.http.get('https://api.github.com/users/' + username + '')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getUser2() {
    /*
    this.getUser('LeeCombs')
      .map(r => r.json())
      .subscribe((res: any) => {
        // res contains the response of the GitHub's API
        console.log('Get user 2');
        console.log(res);
        console.log(res.toString());

        console.log(JSON.stringify(res));
        let resj = JSON.parse(JSON.stringify(res));
        console.log(resj);
        console.log(resj.login);
        console.log(resj.avatar_url);
      });
      */
  }


  /**
   * Temporary function for testing
   * @returns {Promise<T>}
   */
  getCommitsSlowly(): Promise<GithubCommit[]> {
    return new Promise(resolve => {
      // Simulate server latency with 4 second delay
      setTimeout(() => resolve(GITHUBCOMMITS), 4000);
    });
  }

  /**
   * Temporary function for testing
   * @returns {Promise<never>}
   */
  getCommitsFail(): Promise<GithubCommit[]> {
    return Promise.reject('Cannot connect to network');
  }

  /**
   * Temporary function for testing
   * @returns {Promise<T>}
   */
  getIssuesSlowly(): Promise<GithubIssue[]> {
    return new Promise(resolve => {
      // Simulate server latency with 4 second delay
      setTimeout(() => resolve(GITHUBISSUES), 4000);
    });
  }

  /**
   * Temporary function for testing
   * @returns {Promise<never>}
   */
  getIssuesFail(): Promise<GithubIssue[]> {
    return Promise.reject('Cannot connect to network');
  }

}
