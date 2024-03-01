import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKey6Component } from './function-key-6.component';

describe('FunctionKey6Component', () => {
  let component: FunctionKey6Component;
  let fixture: ComponentFixture<FunctionKey6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKey6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKey6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
