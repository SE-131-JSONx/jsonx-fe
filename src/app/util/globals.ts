import { environment } from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

export const globals = {
  // API
  API_VERSION: environment.API_VERSION || '/v1.0',
  API_BASE: environment.API_BASE || 'localhost:5000/api',
  get BASE() {
    return this.API_BASE + this.API_VERSION;
  },


  // ENDPOINTS
  LOGIN: '/login',

  get HEADERS() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})
    };
  },
};
