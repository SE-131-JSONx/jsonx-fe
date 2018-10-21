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
              private snackBar: MatSnackBar) { }

  // noinspection JSMethodCanBeStatic
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
        next(null, r);
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  logout() {
    localStorage.removeItem(globals.STORAGE_KEY);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login']);
  }

  signUp(name: string, surname: string, email: string, login: string, password: string , next) {
    const headers = globals.HEADERS;

    const body = {
      name: name,
      surname: surname,
      email: email,
      login: login,
      password: password
    };

    return this.http.post(globals.BASE + globals.USER, body, headers).subscribe(
      (r: any) => {
        this.openSnackBar('User created, please login!', 2000);
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  /**
   * User
   * */
  updateUserDetails(id: any, details: UserDetails, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.put(globals.BASE + globals.USER + '/' + id, details, headers).subscribe(
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

    return this.http.get(globals.BASE + globals.USER + '/' + id, headers).subscribe(
      (r: any) => {
        r.created = r.created ? new Date(r.created.replace(/-/g, '/')) : null;
        r.updated = r.updated ? new Date(r.updated.replace(/-/g, '/')) : null;
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  /**
   * JSON
   * */
  updateJson(jid, details, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.put(globals.BASE + globals.JSON + '/' + jid, details, headers).subscribe(
      (r: any) => {
        this.openSnackBar('JSON successfully updated', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  saveJson(details, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.post(globals.BASE + globals.JSON + '/save', details, headers).subscribe(
      (r: any) => {
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  deleteJson(jid: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.delete(globals.BASE + globals.JSON + '/' + jid, headers).subscribe(
      (r: any) => {
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  searchJson(q: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.get(globals.BASE + globals.JSON, headers).subscribe(
      (r: any) => {
          next(null, r.json);
        },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  /**
   * TEAM
   * */
  searchTeam(q: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.get(globals.BASE + globals.TEAM, headers).subscribe(
      (r: any) => {
        console.log(r);
        next(null, r.team);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  /**
   * Utilities
   * */
  openSnackBar(message: string, duration: number) {
    this.snackBar.dismiss();
    this.snackBar.open(message, null, {
      duration: duration || 2000,
    });
  }
}
