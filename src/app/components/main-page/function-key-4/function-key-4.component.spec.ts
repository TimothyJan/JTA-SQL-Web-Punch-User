import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey4Component } from './function-key-4.component';

describe('FunctionKey4Component', () => {
  let component: FunctionKey4Component;
  let fixture: ComponentFixture<FunctionKey4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
