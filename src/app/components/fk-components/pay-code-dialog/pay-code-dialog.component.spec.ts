import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCodeDialogComponent } from './pay-code-dialog.component';

describe('PayCodeDialogComponent', () => {
  let component: PayCodeDialogComponent;
  let fixture: ComponentFixture<PayCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
