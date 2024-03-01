import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey5Component } from './function-key-5.component';

describe('FunctionKey5Component', () => {
  let component: FunctionKey5Component;
  let fixture: ComponentFixture<FunctionKey5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
