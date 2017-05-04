import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendCardComponent } from './trend-card.component';

describe('TrendCardComponent', () => {
  let component: TrendCardComponent;
  let fixture: ComponentFixture<TrendCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
