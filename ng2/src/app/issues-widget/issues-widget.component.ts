import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues-widget',
  templateUrl: './issues-widget.component.html',
  styleUrls: ['./issues-widget.component.css']
})
export class IssuesWidgetComponent implements OnInit {


  private issueIndex: number;
  private issuesCount: number;
  private repoName: string;

  private issues;
  private currentIssue;
  private filteredIssues;

  private issueFilterValues: string[];

  private githubIssueColors: {[id: string]: string};


  constructor() {
    this.issuesCount = 0;
    this.issueIndex = 0;

    // TODO: Move these to appropriate classes
    this.githubIssueColors = {
      "bug":"red",
      "duplicate":"grey",
      "enhancement":"lightskyblue",
      "help wanted":"green",
      "invalid":"beige",
      "question":"purple",
      "wontfix":"white"
    };
    this.issueFilterValues = [
      "All",
      "Bug",
      "Duplicate",
      "Enhancement",
      "Help Wanted",
      "Invalid",
      "Question",
      "Won't Fix"
    ];

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.loadSampleData();
    this.updateIssueInfo();
  }

  /**
   * Increment the issueIndex if possible, then update the displayed issue information
   */
  onRightClick() {
    if (this.issueIndex < this.issuesCount) {
      this.issueIndex++;
      this.updateIssueInfo();
    }
  }

  /**
   * Decrement the issueIndex if possible, then update the displayed issue information
   */
  onLeftClick() {
    if (this.issueIndex > 0) {
      this.issueIndex--;
      this.updateIssueInfo();
    }
  }

  isLeftBtnDisabled() {
    return this.issueIndex <= 0;
  }

  isRightBtnDisabled() {
    return this.issueIndex >= this.issuesCount - 1;
  }

  /**
   * Update the issue HTML display elements with the currently selected issue
   */
  updateIssueInfo() {
    this.currentIssue = this.filteredIssues[this.issueIndex];

    document.getElementById('issueLabel').style.background = this.githubIssueColors[this.currentIssue.issueLabel];
    document.getElementById('issueTitle').innerText = this.currentIssue.issueNumber + " Issue Title";
    document.getElementById('issueMessage').innerText = this.currentIssue.issueBody;
  }

  /**
   * Filter existing issues according to the supplied value
   *
   *
   * @param filterVal The filter to apply
   */
  dropdownFilterSelect(filterVal: string) {
    console.log(filterVal);

    // Ensure that filerVal exists within the defined filter array
    if (this.issueFilterValues.indexOf(filterVal) > -1) {
      // Update the dropdownFilterName text

      // TODO: Re-add this once drop-down menu works again
      // document.getElementById('dropdownFilterName').innerHTML = filterVal + '<span class="caret">';

      // TODO: Actually filter issues based on selection

      this.filteredIssues = [];
      this.issueIndex = 0;

      if (filterVal == "All") {
        this.filteredIssues = this.issues;
        this.issuesCount = this.filteredIssues.length;
        this.updateIssueInfo();
      }
      else {
        for (let issue of this.issues) {
          if (issue.issueLabel == filterVal.toLowerCase()) {
            console.log("Found filtered issue");
            this.filteredIssues.push(issue);
            console.log(this.filteredIssues);
          }
        }
        if (this.filteredIssues.length > 0) {
          this.issuesCount = this.filteredIssues.length;
          this.updateIssueInfo();
        }
        else {
          this.issuesCount = 0;
          document.getElementById('issueLabel').style.background = "white";
          document.getElementById('issueTitle').innerText =  "No Issues Found!";
          document.getElementById('issueMessage').innerText = "";
        }
      }
    }
  }

  /**
   * Populate issue widget with sample data
   */
  loadSampleData() {
    // Sample Data
    this.repoName = "Sample Repo";
    this.issues = [
      {
        issueNumber: 42,
        issueBody: "Description of a bug!",
        issueLabel: "bug"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      },
      {
        issueNumber: 51,
        issueBody: "Description of a question",
        issueLabel: "question"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      },
      {
        issueNumber: 60,
        issueBody: "Description of a help wanted",
        issueLabel: "help wanted"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      },
      {
        issueNumber: 69,
        issueBody: "Description of an enhancement",
        issueLabel: "enhancement"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      },
      {
        issueNumber: 43,
        issueBody: "Description of another bug!",
        issueLabel: "bug"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      },
      {
        issueNumber: 44,
        issueBody: "Persistent bug!",
        issueLabel: "bug"
        // issueLabels: [{name: 'label name', color:'F24F5E'}]
      }
    ]
    this.filteredIssues = this.issues;
    this.issuesCount = this.issues.length;
  }
}
