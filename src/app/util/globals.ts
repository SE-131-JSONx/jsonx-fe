import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export const globals = {
  // API
  API_VERSION: environment.API_VERSION || '/v1.0',
  API_BASE: environment.API_BASE || 'localhost:5000/api',
  get BASE() {
    return this.API_BASE + this.API_VERSION;
  },

  // STORAGE
  STORAGE_KEY: 'Authorization',
  get JWT() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  // ENDPOINTS
  LOGIN: '/login',
  USER: '/user',
  JSON: '/json',
  TEAM: '/team',


  get HEADERS() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})
    };
  },
  get AUTH_HEADERS() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': localStorage.getItem(this.STORAGE_KEY),
        'Access-Control-Allow-Origin': '*'})
    };
  },
};
