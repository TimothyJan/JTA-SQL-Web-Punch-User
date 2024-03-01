import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey1Component } from './function-key-1.component';

describe('FunctionKey1Component', () => {
  let component: FunctionKey1Component;
  let fixture: ComponentFixture<FunctionKey1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
