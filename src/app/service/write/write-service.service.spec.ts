import { TestBed } from '@angular/core/testing';

import { WriteServiceService } from './write-service.service';

describe('WriteServiceService', () => {
  let service: WriteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
