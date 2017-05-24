import { TestBed, inject } from '@angular/core/testing';

import { GithubCommitsService } from './github-commits.service';

describe('GithubCommitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubCommitsService]
    });
  });

  it('should be created', inject([GithubCommitsService], (service: GithubCommitsService) => {
    expect(service).toBeTruthy();
  }));
});
