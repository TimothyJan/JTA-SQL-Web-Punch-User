import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelChangeComponent } from './level-change.component';

describe('LevelChangeComponent', () => {
  let component: LevelChangeComponent;
  let fixture: ComponentFixture<LevelChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
