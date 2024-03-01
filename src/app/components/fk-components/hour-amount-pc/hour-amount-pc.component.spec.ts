import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourAmountPcComponent } from './hour-amount-pc.component';

describe('HourAmountPcComponent', () => {
  let component: HourAmountPcComponent;
  let fixture: ComponentFixture<HourAmountPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourAmountPcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourAmountPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
