import { TestBed, inject } from '@angular/core/testing';

import { GithubProjectService } from './github-project.service';

describe('GithubProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubProjectService]
    });
  });

  it('should be created', inject([GithubProjectService], (service: GithubProjectService) => {
    expect(service).toBeTruthy();
  }));
});
