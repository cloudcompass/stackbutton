import { Injectable } from '@angular/core';

import { GithubCommit } from '../_models/GithubCommit';
import { GITHUBCOMMITS } from '../sample-github-commits';

@Injectable()
export class GithubService {

  constructor() { }

  getCommits(): GithubCommit[] {
    return GITHUBCOMMITS;
  }

  getSampleCommits(): GithubCommit[] {
    return GITHUBCOMMITS;
  }

}
