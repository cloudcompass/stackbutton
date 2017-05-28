import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationCardComponent } from './utilization-card.component';

describe('UtilizationCardComponent', () => {
  let component: UtilizationCardComponent;
  let fixture: ComponentFixture<UtilizationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
