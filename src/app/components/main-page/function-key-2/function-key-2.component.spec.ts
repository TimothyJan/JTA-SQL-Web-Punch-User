import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey2Component } from './function-key-2.component';

describe('FunctionKey2Component', () => {
  let component: FunctionKey2Component;
  let fixture: ComponentFixture<FunctionKey2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
