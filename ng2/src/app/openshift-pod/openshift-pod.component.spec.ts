import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenshiftPodComponent } from './openshift-pod.component';

describe('OpenshiftPodComponent', () => {
  let component: OpenshiftPodComponent;
  let fixture: ComponentFixture<OpenshiftPodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenshiftPodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenshiftPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
