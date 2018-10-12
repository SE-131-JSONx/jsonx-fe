import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {globals} from '../util/globals';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'Authorization';

  constructor(private http: HttpClient,
              private router: Router,
              private snackbar: MatSnackBar) { }

  get isAuthenticated() {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  login(username: string, password: string, next) {
    const headers = globals.HEADERS;

    const body = {
      login: username,
      password: password
    };

    return this.http.post(globals.BASE + globals.LOGIN, body, headers).subscribe(
      (r: any) => {
        localStorage.setItem(this.STORAGE_KEY, r.token);
        console.log(r);
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, duration: number) {
    this.snackbar.open(message, null, {
      duration: duration || 2000,
    });
  }
}
