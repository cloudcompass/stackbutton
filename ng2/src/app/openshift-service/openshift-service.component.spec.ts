import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenshiftServiceComponent } from './openshift-service.component';

describe('OpenshiftServiceComponent', () => {
  let component: OpenshiftServiceComponent;
  let fixture: ComponentFixture<OpenshiftServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenshiftServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenshiftServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
