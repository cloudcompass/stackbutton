export class GithubIssueModel {
  id: number;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  // user: GithubUserModel
  issueLabel: string; // TODO - remove
  // labels: GithubLabel[];
  // assignee: GithubUserModel
  // milestone: GithubMilestone
  locked: boolean;
  comments: number;
  closed_at: string;
  created_at: string;
  updated_at: string;
  // repository: GithubRepo
}
