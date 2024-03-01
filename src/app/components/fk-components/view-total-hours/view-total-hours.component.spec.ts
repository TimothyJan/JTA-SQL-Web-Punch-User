import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTotalHoursComponent } from './view-total-hours.component';

describe('ViewTotalHoursComponent', () => {
  let component: ViewTotalHoursComponent;
  let fixture: ComponentFixture<ViewTotalHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTotalHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTotalHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
