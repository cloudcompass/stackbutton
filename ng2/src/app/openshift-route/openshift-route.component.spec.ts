import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenshiftRouteComponent } from './openshift-route.component';

describe('OpenshiftRouteComponent', () => {
  let component: OpenshiftRouteComponent;
  let fixture: ComponentFixture<OpenshiftRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenshiftRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenshiftRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
