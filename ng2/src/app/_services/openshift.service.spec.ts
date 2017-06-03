import { TestBed, inject } from '@angular/core/testing';

import { OpenShiftService } from './openshift.service';

describe('OpenShiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenShiftService]
    });
  });

  it('should be created', inject([OpenShiftService], (service: OpenShiftService) => {
    expect(service).toBeTruthy();
  }));
});
