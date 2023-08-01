import { TestBed } from '@angular/core/testing';

import { AuthApisService } from './auth-apis.service';

describe('AuthApisService', () => {
  let service: AuthApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
