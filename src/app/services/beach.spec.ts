import { TestBed } from '@angular/core/testing';

import { Beach } from './beach';

describe('Beach', () => {
  let service: Beach;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Beach);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
