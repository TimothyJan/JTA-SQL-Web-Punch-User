import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKeyComponent } from './function-key.component';

describe('FunctionKeyComponent', () => {
  let component: FunctionKeyComponent;
  let fixture: ComponentFixture<FunctionKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
