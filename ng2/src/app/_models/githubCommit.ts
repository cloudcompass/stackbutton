/**
 * Created by Garmonz on 2017-05-14.
 */
export class GithubCommit {
  commit : {
    author: {
      name: string;
      date: string;
    };
    committer: {
      name: string;
      date: string;
    };
    message: string;
    comment_count: number;
    // temp
    sha: string;
  };
  author: {
    login: string;
    id: number;
    avatar_url: string;
  };
  committer: {
    login: string;
    id: number;
    avatar_url: string;
  };
  stats: {
    additions: number;
    deletions: number;
    total: number;
  }
}
