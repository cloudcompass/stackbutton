import { Component, OnInit } from '@angular/core';

import { GithubService } from '../_services/github.service';

@Component({
  selector: 'app-commit-widget',
  templateUrl: './commits-widget.component.html',
  styleUrls: ['./commits-widget.component.css']
})
export class CommitWidgetComponent implements OnInit {

  private repoName: string;

  private commits;
  private currentCommit;
  private commitsCount: number;
  private commitIndex: number; // Tracker for commit currently shown

  constructor(private githubService: GithubService) {
    this.commitsCount = 0;
    this.commitIndex = 0;
  }

  ngOnInit() {
    this.loadSampleData();
  }

  ngAfterViewInit() {
    this.updateCommitInfo();
  }

  /**
   * Increment the commitIndex if possible, then update the displayed commit information
   */
  onRightClick() {
    if (this.commitIndex < this.commitsCount) {
      this.commitIndex++;
      this.updateCommitInfo();
    }
  }

  /**
   * Decrement the commitIndex if possible, then update the displayed commit information
   */
  onLeftClick() {
    if (this.commitIndex > 0) {
      this.commitIndex--;
      this.updateCommitInfo();
    }
  }

  isLeftBtnDisabled() {
    return this.commitIndex <= 0;
  }

  isRightBtnDisabled() {
    return this.commitIndex >= this.commitsCount - 1;
  }

  /**
   * Update the commit HTML display elements with the currently selected commit
   */
  updateCommitInfo() {
    console.log("update commit info");

    this.currentCommit = this.commits[this.commitIndex].commit;

    console.log("Current commit: " + this.currentCommit.message);
    console.log("Current author: " + this.currentCommit.author.name);
    console.log("Current commiter: " + this.currentCommit.committer.name);

    document.getElementById('commitAuthor').innerText = this.currentCommit.committer.name;
    document.getElementById('commitDate').innerText = this.currentCommit.committer.date;
    document.getElementById('commitMessage').innerText = this.currentCommit.message;
    document.getElementById('commitSha').innerText = this.currentCommit.sha;
  }

  /**
   * Populate commit widget with sample data
   */
  loadSampleData() {
    console.log("Loading sample commit data");

    this.repoName = "Sample Repo";
    this.commitsCount = 5;
    this.commitIndex = 0;

    this.commits = this.githubService.getSampleCommits();

    this.commitsCount = this.commits.length;
  }
}
