import { TestBed, inject } from '@angular/core/testing';

import { GithubIssuesService } from './github-issues.service';

describe('GithubIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubIssuesService]
    });
  });

  it('should be created', inject([GithubIssuesService], (service: GithubIssuesService) => {
    expect(service).toBeTruthy();
  }));
});
