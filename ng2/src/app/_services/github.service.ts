import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GithubCommit } from '../_models/githubCommit';

import { GithubIssue } from '../_models/githubIssue';
import { GITHUBISSUES } from '../sample-data/sample-github-issues';

import { GithubUser } from '../_models/githubUser';

import { GITHUBCOMMITS } from '../sample-data/sample-github-commits';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubService {

  ghUser: GithubUser;

  constructor(private http: Http) { }

  getCommits(): Promise<GithubCommit[]> {
    return Promise.resolve(GITHUBCOMMITS);
  }

  getCommitsSample(): GithubCommit[] {
    return GITHUBCOMMITS;
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
