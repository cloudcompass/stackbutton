import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceManageComponent } from './data-source-manage.component';

describe('DataSourceManageComponent', () => {
  let component: DataSourceManageComponent;
  let fixture: ComponentFixture<DataSourceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
