import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenshiftProjectCardComponent } from './openshift-project-card.component';

describe('OpenshiftProjectCardComponent', () => {
  let component: OpenshiftProjectCardComponent;
  let fixture: ComponentFixture<OpenshiftProjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenshiftProjectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenshiftProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
