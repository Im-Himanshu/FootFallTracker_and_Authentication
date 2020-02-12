import { TestBed } from '@angular/core/testing';

import { RegisteredUserService } from './registered-user.service';

describe('RegisteredUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteredUserService = TestBed.get(RegisteredUserService);
    expect(service).toBeTruthy();
  });
});
