/**
 * Created by Garmonz on 2017-05-14.
 */
import { GithubCommit } from './_models/GithubCommit';

export const GITHUBCOMMITS : GithubCommit[] = [
  // First sample commit
  {
    commit: {
      author: {
        name: "Alfred Alfredo",
        date: "2001-01-01T16:00:49Z"
      },
      committer: {
        name: "Alfred Alfredo",
        date: "2001-01-01T17:11:42Z"
      },
      message: "Fixed all the bugs",
      comment_count: 0,
      // Temp
      sha: "f6cad4b"
    },
    author: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    committer: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    stats: {
      additions: 11,
      deletions: 1,
      total: 12
    },
  },
  // Second sample commit
  {
    commit: {
      author: {
        name: "Bart Blimpson",
        date: "2002-02-02T16:00:49Z"
      },
      committer: {
        name: "Bart Blimpson",
        date: "2002-02-02T16:00:49Z"
      },
      message: "Introduced more bugs",
      comment_count: 5,
      // Temp
      sha: "e4cxd7y"
    },
    author: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    committer: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    stats: {
      additions: 22,
      deletions: 2,
      total: 24
    },
  },
  // Third sample commit
  {
    commit: {
      author: {
        name: "Cheryl Cornwall",
        date: "2003-03-03T16:00:49Z"
      },
      committer: {
        name: "Cheryl Cornwall",
        date: "2003-03-03T16:00:49Z"
      },
      message: "All work and no play makes Jack a dull boy " +
      "All work and no play makes Jack a dull boy " +
      "All work and no play makes Jack a dull boy " +
      "All work and no play makes Jack a dull boy " +
      "All work and no play makes Jack a dull boy " +
      "All work and no play makes Jack a dull boy ",
      comment_count: 0,
      // Temp
      sha: "a2yvc2c"
    },
    author: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    committer: {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif"
    },
    stats: {
      additions: 33,
      deletions: 3,
      total: 36
    },
  }
];
