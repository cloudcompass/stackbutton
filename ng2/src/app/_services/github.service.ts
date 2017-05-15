import { Injectable } from '@angular/core';

import { GithubCommit } from '../_models/GithubCommit';
import { GITHUBCOMMITS } from '../sample-github-commits';

@Injectable()
export class GithubService {

  constructor() { }

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
  getCommitsFail() :Promise<GithubCommit[]> {
    return Promise.reject("Cannot connect to network");
  }

}
