import { TestBed } from '@angular/core/testing';

import { ElectronicstoreService } from './electronicstore.service';

describe('ElectronicstoreService', () => {
  let service: ElectronicstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronicstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
