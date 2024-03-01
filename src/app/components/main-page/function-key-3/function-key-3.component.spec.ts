import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey3Component } from './function-key-3.component';

describe('FunctionKey3Component', () => {
  let component: FunctionKey3Component;
  let fixture: ComponentFixture<FunctionKey3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
