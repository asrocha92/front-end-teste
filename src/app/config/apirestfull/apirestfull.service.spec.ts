import { TestBed } from '@angular/core/testing';

import { ApirestfullService } from './apirestfull.service';

describe('ApirestfullService', () => {
  let service: ApirestfullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirestfullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
