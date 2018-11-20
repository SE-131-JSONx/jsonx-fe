import { Injectable, Injector } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {globals} from '../util/globals';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private authService: BackendService) { }

  // Add auth token to requests and handle 401s
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(BackendService);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', '' + localStorage.getItem(globals.STORAGE_KEY))
    });
    return next.handle(authRequest).pipe(tap(event => {}, err => {
      if (err instanceof HttpErrorResponse && err.status === 403) {
        // handle 401 errors
        this.authService.openSnackBar('Session has expired. Please login again.', 5000);
        this.authService.logout();
      }
    }));
  }
}
