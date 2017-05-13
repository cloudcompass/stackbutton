import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesWidgetComponent } from './issues-widget.component';

describe('IssuesWidgetComponent', () => {
  let component: IssuesWidgetComponent;
  let fixture: ComponentFixture<IssuesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
