import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBoardComponent } from './demo-board.component';

describe('DemoBoardComponent', () => {
  let component: DemoBoardComponent;
  let fixture: ComponentFixture<DemoBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
