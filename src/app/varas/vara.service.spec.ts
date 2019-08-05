import { TestBed } from '@angular/core/testing';

import { VaraService } from './vara.service';

describe('VaraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VaraService = TestBed.get(VaraService);
    expect(service).toBeTruthy();
  });
});
