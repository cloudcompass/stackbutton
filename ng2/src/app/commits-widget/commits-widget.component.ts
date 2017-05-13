import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commit-widget',
  templateUrl: './commits-widget.component.html',
  styleUrls: ['./commits-widget.component.css']
})
export class CommitWidgetComponent implements OnInit {

  private commitsCount: number;
  private commitIndex: number; // Tracker for commit currently shown
  private repoName: string;
  private commitAuthors: string[];
  private commitDates: string[];
  private commitMessages: string[];

  constructor() {
    // Sample Data
    this.repoName = "Sample Repo";
    this.commitsCount = 5;
    this.commitIndex = 0;
    this.commitAuthors = ['Alan Ackman', 'Bob Bobman', 'Cynthia Cool', 'Dodger Dodge', 'Evan Evanson'];
    this.commitDates = ['01/01/1991', '02/02/1992', '03/03/1993', '04/04/1994', '05/05/1995'];
    this.commitMessages = ['Initial Commit','Fixed Stuff','Added new feature','Removed unused imports','Apparently those imports were used'];
  }

  ngOnInit() { }

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
    document.getElementById('commitAuthor').innerText = this.commitAuthors[this.commitIndex];
    document.getElementById('commitDate').innerText = this.commitDates[this.commitIndex];
    document.getElementById('commitMessage').innerText = this.commitMessages[this.commitIndex];
  }
}
