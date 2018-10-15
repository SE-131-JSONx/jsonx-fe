import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globals } from '../util/globals';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserDetails } from '../util/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor(private http: HttpClient,
              private router: Router,
              private snackbar: MatSnackBar) { }

  /**
   * Authentication
   * */

  get isAuthenticated() {
    return !!localStorage.getItem(globals.STORAGE_KEY);
  }

  login(username: string, password: string, next) {
    const headers = globals.HEADERS;

    const body = {
      login: username,
      password: password
    };

    return this.http.post(globals.BASE + globals.LOGIN, body, headers).subscribe(
      (r: any) => {
        localStorage.setItem(globals.STORAGE_KEY, r.token);
        console.log(r);
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  logout() {
    localStorage.removeItem(globals.STORAGE_KEY);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login']);
  }

  signUp() {
    // this method with call to our back end apis and attempt to register the user
    // backend documentation for Create User:
    // https://docs.google.com/document/d/186uPY6rmbBvEOeE7cjtL3g_EPoIXm7kGo3NXN_1We1o/edit#heading=h.75cohzfnk3vz
    // see login() above for an example on how to properly format and perform an HTTP call in angular
    // remove these comments when done
  }

  /**
   * User
   * */
  updateUserDetails(id: any, details: UserDetails, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.put(globals.BASE + globals.USER_DETAILS + id, details, headers).subscribe(
      (r: any) => {
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  getUserDetails(id: any, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.get(globals.BASE + globals.USER_DETAILS + id, headers).subscribe(
      (r: any) => {
        r.created = new Date(r.created.replace(/-/g, '/'));
        r.updated = r.updated ? new Date(r.created.replace(/-/g, '/')) : null;
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  /**
   * Utilities
   * */
  openSnackBar(message: string, duration: number) {
    this.snackbar.open(message, null, {
      duration: duration || 2000,
    });
  }
}
