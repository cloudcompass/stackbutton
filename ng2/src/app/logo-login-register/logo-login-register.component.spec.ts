import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoLoginRegisterComponent } from './logo-login-register.component';

describe('LogoLoginRegisterComponent', () => {
  let component: LogoLoginRegisterComponent;
  let fixture: ComponentFixture<LogoLoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoLoginRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
