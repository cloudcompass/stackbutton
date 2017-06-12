import { Component, OnInit } from '@angular/core';
import { GithubCommitsService } from '../_services/github-commits.service';

@Component({
  selector: 'app-commit-widget',
  templateUrl: './commits-card.component.html',
  styleUrls: ['./commits-card.component.css']
})
export class CommitCardComponent implements OnInit {

  private repoName: string;

  private loadingCommits: boolean;
  private rightButtonDisabled: boolean;
  private leftButtonDisabled: boolean;

  private commits;
  private currentCommit;
  private commitsCount: number;
  private commitIndex: number; // Tracker for commit currently shown

  private commitAuthor: string;
  private commitDate: string;
  private commitMessage: string;
  private commitSha: string; // Temp?
  private avatarUrl: string;

  constructor(private githubCommitsService: GithubCommitsService) {
    this.commits = [];
    this.commitsCount = 0;
    this.commitIndex = 0;

    this.loadingCommits = true;
    this.leftButtonDisabled = true;
    this.rightButtonDisabled = true;

    this.commitAuthor = 'Author';
    this.commitDate = '01/01/2001';
    this.commitMessage = 'Message';
    this.commitSha = '1a2b3c4d';
    // this.avatarUrl = "";
  }

  ngOnInit() {
    this.loadSampleData();
  }

  /**
   * Increment the commitIndex if possible, then update buttons and the displayed commit information
   */
  onRightClick() {
    if (this.commitIndex < this.commitsCount) {
      this.commitIndex++;

      // Update button capabilities
      if (this.commitIndex === this.commitsCount - 1) this.rightButtonDisabled = true;
      if (this.commitIndex > 0) this.leftButtonDisabled = false;

      this.updateCommitInfo();
    }
  }

  /**
   * Decrement the commitIndex if possible, then update buttons and the displayed commit information
   */
  onLeftClick() {
    if (this.commitIndex > 0) {
      this.commitIndex--;

      // Update button capabilities
      if (this.commitIndex < this.commitsCount) this.rightButtonDisabled = false;
      if (this.commitIndex === 0) this.leftButtonDisabled = true;

      this.updateCommitInfo();
    }
  }

  /**
   * Update the commit HTML display elements with the currently selected commit
   */
  updateCommitInfo() {
    // Grab the current commit
    this.currentCommit = this.commits[this.commitIndex];

    // Update the commit information
    this.commitAuthor = this.currentCommit.commit.committer.name;
    this.commitMessage = this.currentCommit.commit.message;
    this.commitSha = this.currentCommit.sha;

    const commitDate = new Date(this.currentCommit.commit.committer.date);
    this.commitDate = commitDate.toLocaleString();

    // this.avatarUrl = this.currentCommit.commit.committer.avatar_url;
  }

  /**
   * Populate commit widget with sample data
   */
  loadSampleData() {
    console.log('Loading sample commit data');

    this.loadingCommits = true;

    this.repoName = 'Sample Repo';

    // Clear then repopulate commits
    this.commits = [];

    // TODO: getCommitsSlowly is temporary for testing, to be replaced with getCommits
    this.githubCommitsService.getCommitsSampleSlowly().subscribe(
      commits => {
        console.log('Github commits fetch success');
        this.commits = commits;

        // Setup some vars TODO: Move this to appropriate spot
        this.loadingCommits = false;
        this.commitIndex = 0;
        this.commitsCount = this.commits.length;

        // Enable the right button if there's more than one commit
        if (this.commitsCount > 0) this.rightButtonDisabled = false;

        this.updateCommitInfo();
      },
      error => {
        console.error('Error fetching github commits: ' + error);
        // TODO: Display en error of sorts to the user
      });
  }
}
