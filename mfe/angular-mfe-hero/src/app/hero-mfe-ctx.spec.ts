import { TestBed } from '@angular/core/testing';

import { HeroMfeCTX } from './hero-mfe-ctx';

describe('HeroMfeCTX', () => {
  let service: HeroMfeCTX;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroMfeCTX);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
