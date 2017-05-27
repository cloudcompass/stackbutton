import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceAddComponent } from './data-source-add.component';

describe('DataSourceAddComponent', () => {
  let component: DataSourceAddComponent;
  let fixture: ComponentFixture<DataSourceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
