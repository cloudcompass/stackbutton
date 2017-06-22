import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashTitleCardComponent } from './splash-title-card.component';

describe('SplashTitleCardComponent', () => {
  let component: SplashTitleCardComponent;
  let fixture: ComponentFixture<SplashTitleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashTitleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
