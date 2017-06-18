import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceViewComponent } from './data-source-view.component';

describe('DataSourceViewComponent', () => {
  let component: DataSourceViewComponent;
  let fixture: ComponentFixture<DataSourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
