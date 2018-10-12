import { TestBed, inject } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BackendService} from './backend.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material';

describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [LoadingService]
    });
  });

  it('should be created', inject([BackendService, HttpClientTestingModule, RouterTestingModule], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
