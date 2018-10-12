import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService, HttpClientTestingModule, RouterTestingModule], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
