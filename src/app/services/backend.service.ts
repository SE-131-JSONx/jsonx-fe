import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

    return this.http.put(globals.BASE + globals.USER + '/' + id, details, { headers: <HttpHeaders> headers }).subscribe(
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

    return this.http.get(globals.BASE + globals.USER + '/' + id, { headers: <HttpHeaders> headers }).subscribe(
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

  searchUser(q: string, next) {
    const headers = globals.AUTH_HEADERS;

    const params = new HttpParams().set('q', q);

    this.http.get(globals.BASE + globals.USER, {headers: <HttpHeaders>headers, params: <HttpParams>params}).subscribe(
      (r: any) => {
        r.user.forEach((j) => {
          j.created = j.created ? new Date(j.created.replace(/-/g, '/')) : null;
          j.updated = j.updated ? new Date(j.updated.replace(/-/g, '/')) : null;
        });
        next(null, r.user);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  /**
   * JSON
   * */
  updateJson(jid, details, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.put(globals.BASE + globals.JSON + '/' + jid, details, { headers: <HttpHeaders> headers }).subscribe(
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

    return this.http.post(globals.BASE + globals.JSON + '/save', details, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('JSON saved.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  deleteJson(jid: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.delete(globals.BASE + globals.JSON + '/' + jid, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('JSON deleted.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  searchJson(q: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.get(globals.BASE + globals.JSON, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
          r.json.forEach((j) => {
            j.created = j.created ? new Date(j.created.replace(/-/g, '/')) : null;
            j.updated = j.updated ? new Date(j.updated.replace(/-/g, '/')) : null;
          });
          next(null, r.json);
        },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  searchJsonAccess(jid: number, q: string, next) {
    const headers = globals.AUTH_HEADERS;

    const params = new HttpParams().set('q', q);

    return this.http.get(globals.BASE + globals.JSON + '/' + jid + '/group',
      {headers: <HttpHeaders>headers, params: <HttpParams>params}).subscribe(
      (r: any) => {
        r.user.forEach((j) => {
          j.created = j.created ? new Date(j.created.replace(/-/g, '/')) : null;
          j.updated = j.updated ? new Date(j.updated.replace(/-/g, '/')) : null;
        });
        next(null, r.user);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  shareJson(jid, details, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.post(globals.BASE + globals.JSON + '/' + jid + '/group', details, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('JSON shared.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  unshareJson(jid, details, next) {
    const headers = globals.AUTH_HEADERS;

    this.http.request('DELETE', globals.BASE + globals.JSON + '/' + jid + '/group', {
      headers: <HttpHeaders> headers,
      body: details
    }).subscribe(
      (r: any) => {
        this.openSnackBar('Unshared JSON.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  /**
   * TEAM
   * */
  saveTeam(details, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.post(globals.BASE + globals.TEAM, details, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('Team created.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  updateTeamDetails(tid: any, name: string, next) {
    const headers = globals.AUTH_HEADERS;

    const details = {
      'name': name
    };

    return this.http.put(globals.BASE + globals.TEAM + '/' + tid, details, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('Team updated.', 3000);
        next(null, r);
      },
      (error: any) => {
        this.openSnackBar(error.error.message, 2000);
        next(error, null);
      });
  }

  deleteTeam(tid: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.delete(globals.BASE + globals.TEAM + '/' + tid, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('Team deleted.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  searchTeam(q: string, next) {
    const headers = globals.AUTH_HEADERS;

    return this.http.get(globals.BASE + globals.TEAM, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        r.team.forEach((j) => {
          j.created = j.created ? new Date(j.created.replace(/-/g, '/')) : null;
          j.updated = j.updated ? new Date(j.updated.replace(/-/g, '/')) : null;
        });
        next(null, r.team);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  searchTeamMember(q: string, tid: number, next) {
    const headers = globals.AUTH_HEADERS;

    const params = new HttpParams().set('q', q);

    this.http.get(globals.BASE + globals.TEAM + '/' + tid + '/members',
      {headers: <HttpHeaders>headers, params: <HttpParams>params}).subscribe(
      (r: any) => {
        r.user.forEach((j) => {
          j.created = j.created ? new Date(j.created.replace(/-/g, '/')) : null;
          j.updated = j.updated ? new Date(j.updated.replace(/-/g, '/')) : null;
        });
        next(null, r.user);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  addTeamMembers(tid, users, next) {
    const headers = globals.AUTH_HEADERS;

    const details = {
      users: users
    };

    return this.http.post(globals.BASE + globals.TEAM + '/' + tid + '/access', details, { headers: <HttpHeaders> headers }).subscribe(
      (r: any) => {
        this.openSnackBar('Added team members.', 3000);
        next(null, r);
      },
      (e) => {
        this.openSnackBar(e.error.message, 2000);
        next(e, null);
      });
  }

  removeTeamMember(tid, users, next) {
    const headers = globals.AUTH_HEADERS;

    const details = {
      users: users
    };

    this.http.request('DELETE', globals.BASE + globals.TEAM + '/' + tid + '/access', {
      headers: <HttpHeaders> headers,
      body: details
    }).subscribe(
      (r: any) => {
        this.openSnackBar('Removed team members.', 3000);
        next(null, r);
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
