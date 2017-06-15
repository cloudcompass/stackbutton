import { TestBed, inject } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';

describe('DataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSourceService]
    });
  });

  it('should be created', inject([DataSourceService], (service: DataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
