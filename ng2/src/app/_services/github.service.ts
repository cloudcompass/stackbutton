import { Injectable } from '@angular/core';

import { GithubCommit } from '../_models/GithubCommit';
import { GithubIssue } from '../_models/githubIssue';

import { GITHUBCOMMITS } from '../sample-github-commits';
import { GITHUBISSUES } from '../sample-github-issues';

@Injectable()
export class GithubService {

  constructor() { }

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
  getCommitsFail() :Promise<GithubCommit[]> {
    return Promise.reject("Cannot connect to network");
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
  getIssuesFail() :Promise<GithubIssue[]> {
    return Promise.reject("Cannot connect to network");
  }

}
