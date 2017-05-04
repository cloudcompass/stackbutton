import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationBarComponent } from './utilization-bar.component';

describe('UtilizationBarComponent', () => {
  let component: UtilizationBarComponent;
  let fixture: ComponentFixture<UtilizationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
