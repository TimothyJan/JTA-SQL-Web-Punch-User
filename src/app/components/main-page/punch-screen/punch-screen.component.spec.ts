import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchScreenComponent } from './punch-screen.component';

describe('PunchScreenComponent', () => {
  let component: PunchScreenComponent;
  let fixture: ComponentFixture<PunchScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PunchScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PunchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
