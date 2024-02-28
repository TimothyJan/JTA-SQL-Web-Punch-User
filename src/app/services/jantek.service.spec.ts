import { TestBed } from '@angular/core/testing';

import { JantekService } from './jantek.service';

describe('JantekService', () => {
  let service: JantekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JantekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
