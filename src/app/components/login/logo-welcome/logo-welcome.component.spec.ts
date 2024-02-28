import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoWelcomeComponent } from './logo-welcome.component';

describe('LogoWelcomeComponent', () => {
  let component: LogoWelcomeComponent;
  let fixture: ComponentFixture<LogoWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
