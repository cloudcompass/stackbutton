import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenshiftPodCardComponent } from './openshift-pod-card.component';

describe('OpenshiftPodCardComponent', () => {
  let component: OpenshiftPodCardComponent;
  let fixture: ComponentFixture<OpenshiftPodCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenshiftPodCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenshiftPodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
