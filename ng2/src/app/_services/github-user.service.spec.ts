import { TestBed, inject } from '@angular/core/testing';

import { GithubUserService } from './github-user.service';

describe('GithubUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubUserService]
    });
  });

  it('should be created', inject([GithubUserService], (service: GithubUserService) => {
    expect(service).toBeTruthy();
  }));
});
