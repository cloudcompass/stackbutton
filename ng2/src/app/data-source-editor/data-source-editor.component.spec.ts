import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceEditorComponent } from './data-source-editor.component';

describe('DataSourceEditorComponent', () => {
  let component: DataSourceEditorComponent;
  let fixture: ComponentFixture<DataSourceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
