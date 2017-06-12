export class GithubCommitModel {
  url: string;
  sha: string;
  html_url: string;
  commit: {
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
  };
}
