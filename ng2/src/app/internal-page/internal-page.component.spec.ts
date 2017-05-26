import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalPageComponent } from './internal-page.component';

describe('InternalPageComponent', () => {
  let component: InternalPageComponent;
  let fixture: ComponentFixture<InternalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
