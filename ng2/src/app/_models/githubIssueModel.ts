/**
 * Created by Garmonz on 2017-05-14.
 */
export class GithubIssue {
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
  // user: GithubUser
  issueLabel: string; // TODO - remove
  // labels: GithubLabel[];
  // assignee: GithubUser
  // milestone: GithubMilestone
  locked: boolean;
  comments: number;
  closed_at: string;
  created_at: string;
  updated_at: string;
  // repository: GithubRepo
}
