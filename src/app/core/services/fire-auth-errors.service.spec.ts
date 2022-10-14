import { TestBed } from '@angular/core/testing';

import { FireAuthErrorService } from './fire-auth-errors.service';

describe('ErrorService', () => {
  let service: FireAuthErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireAuthErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
