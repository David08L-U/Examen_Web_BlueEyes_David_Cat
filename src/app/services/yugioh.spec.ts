import { TestBed } from '@angular/core/testing';

import { Yugioh } from './yugioh';

describe('Yugioh', () => {
  let service: Yugioh;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Yugioh);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
