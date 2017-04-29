import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationComponent } from './vertical-navigation.component';

describe('VerticalNavigationComponent', () => {
  let component: VerticalNavigationComponent;
  let fixture: ComponentFixture<VerticalNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
