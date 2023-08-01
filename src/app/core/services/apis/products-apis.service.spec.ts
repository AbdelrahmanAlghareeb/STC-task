import { TestBed } from '@angular/core/testing';

import { ProductsApisService } from './products-apis.service';

describe('ProductsApisService', () => {
  let service: ProductsApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
