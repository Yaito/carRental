import { TestBed } from '@angular/core/testing';

import { AuthRestrictionService } from './auth-restriction.service';

describe('AuthRestrictionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRestrictionService = TestBed.get(AuthRestrictionService);
    expect(service).toBeTruthy();
  });
});
