import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionKeyListComponent } from './function-key-list.component';

describe('FunctionKeyListComponent', () => {
  let component: FunctionKeyListComponent;
  let fixture: ComponentFixture<FunctionKeyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionKeyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionKeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
