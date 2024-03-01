import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakLunchComponent } from './break-lunch.component';

describe('BreakLunchComponent', () => {
  let component: BreakLunchComponent;
  let fixture: ComponentFixture<BreakLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakLunchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreakLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
