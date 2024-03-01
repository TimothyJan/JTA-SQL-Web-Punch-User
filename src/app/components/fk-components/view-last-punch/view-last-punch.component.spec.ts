import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLastPunchComponent } from './view-last-punch.component';

describe('ViewLastPunchComponent', () => {
  let component: ViewLastPunchComponent;
  let fixture: ComponentFixture<ViewLastPunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLastPunchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLastPunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
