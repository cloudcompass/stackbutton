import { Component, OnInit } from '@angular/core';

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

  constructor() {
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

    this.commits = [
      // First sample commit
      {
        commit: {
          author: {
            name: "Alfred Alfredo",
            date: "2001-01-01T16:00:49Z"
          },
          committer: {
            name: "Alfred Alfredo",
            date: "2001-01-01T16:00:49Z"
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

    this.commitsCount = this.commits.length;
  }
}
