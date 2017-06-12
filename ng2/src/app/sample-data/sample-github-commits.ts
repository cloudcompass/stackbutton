/**
 * Created by Garmonz on 2017-05-14.
 */
import { GithubCommitModel } from '../_models/githubCommitModel';

export const GITHUBCOMMITS: GithubCommitModel[] = [
  // First sample commit
  {
    url: '',
    sha: 'f6cad4b',
    html_url: '',
    commit: {
      author: {
        name: 'Alfred Alfredo',
        date: '2001-01-01T16:00:49Z'
      },
      committer: {
        name: 'Alfred Alfredo',
        date: '2001-01-01T17:11:42Z'
      },
      message: 'Fixed all the bugs',
      comment_count: 0
    },
    author: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    committer: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    stats: {
      additions: 11,
      deletions: 1,
      total: 12
    },
  },
  // Second sample commit
  {
    url: '',
    sha: 'e4cxd7y',
    html_url: '',
    commit: {
      author: {
        name: 'Bart Blimpson',
        date: '2002-02-02T16:00:49Z'
      },
      committer: {
        name: 'Bart Blimpson',
        date: '2002-02-02T16:00:49Z'
      },
      message: 'Introduced more bugs',
      comment_count: 5
    },
    author: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    committer: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    stats: {
      additions: 22,
      deletions: 2,
      total: 24
    },
  },
  // Third sample commit
  {
    url: '',
    sha: 'a2yvc2c',
    html_url: '',
    commit: {
      author: {
        name: 'Cheryl Cornwall',
        date: '2003-03-03T16:00:49Z'
      },
      committer: {
        name: 'Cheryl Cornwall',
        date: '2003-03-03T16:00:49Z'
      },
      message: 'All work and no play makes Jack a dull boy ' +
      'All work and no play makes Jack a dull boy ' +
      'All work and no play makes Jack a dull boy ' +
      'All work and no play makes Jack a dull boy ' +
      'All work and no play makes Jack a dull boy ' +
      'All work and no play makes Jack a dull boy ',
      comment_count: 0
    },
    author: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    committer: {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif'
    },
    stats: {
      additions: 33,
      deletions: 3,
      total: 36
    },
  }
];
