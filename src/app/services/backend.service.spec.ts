import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [BackendService]
    });
  });

  it('should be created', inject([BackendService, HttpClientTestingModule, RouterTestingModule], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
