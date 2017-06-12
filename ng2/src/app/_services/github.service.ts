import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GithubCommitModel } from '../_models/githubCommitModel';

import { GithubIssueModel } from '../_models/githubIssueModel';
import { GITHUBISSUES } from '../sample-data/sample-github-issues';

import { GithubUserModel } from '../_models/githubUserModel';

import { GITHUBCOMMITS } from '../sample-data/sample-github-commits';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubService {

  ghUser: GithubUserModel;

  constructor(private http: Http) { }

  getCommits(): Promise<GithubCommitModel[]> {
    return Promise.resolve(GITHUBCOMMITS);
  }

  getCommitsSample(): GithubCommitModel[] {
    return GITHUBCOMMITS;
  }

  /**
   * Temporary function for testing
   * @returns {Promise<T>}
   */
  getCommitsSlowly(): Promise<GithubCommitModel[]> {
    return new Promise(resolve => {
      // Simulate server latency with 4 second delay
      setTimeout(() => resolve(GITHUBCOMMITS), 4000);
    });
  }

  /**
   * Temporary function for testing
   * @returns {Promise<never>}
   */
  getCommitsFail(): Promise<GithubCommitModel[]> {
    return Promise.reject('Cannot connect to network');
  }

  /**
   * Temporary function for testing
   * @returns {Promise<T>}
   */
  getIssuesSlowly(): Promise<GithubIssueModel[]> {
    return new Promise(resolve => {
      // Simulate server latency with 4 second delay
      setTimeout(() => resolve(GITHUBISSUES), 4000);
    });
  }

  /**
   * Temporary function for testing
   * @returns {Promise<never>}
   */
  getIssuesFail(): Promise<GithubIssueModel[]> {
    return Promise.reject('Cannot connect to network');
  }

}
