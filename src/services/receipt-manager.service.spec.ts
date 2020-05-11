import { TestBed } from '@angular/core/testing';

import { ReceiptManagerService } from './receipt-manager.service';

describe('ReceiptManagerService', () => {
  let service: ReceiptManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
