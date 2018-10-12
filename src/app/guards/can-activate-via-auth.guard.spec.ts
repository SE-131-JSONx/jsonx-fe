import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material';

describe('CanActivateViaAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [CanActivateViaAuthGuard]
    });
  });

  it('should ...', inject([CanActivateViaAuthGuard, HttpClientTestingModule, RouterTestingModule], (guard: CanActivateViaAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
