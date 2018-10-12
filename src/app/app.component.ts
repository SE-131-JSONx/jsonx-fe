import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JSONx';
  subtitles = {
    '/login': 'login',
    '/signup': 'signup',
    '/dashboard': 'dashboard',
  };

  routes = [
    ['/dashboard', 'Dashboard'],
  ];

  constructor(public router: Router, public loadingService: LoadingService, public authService: AuthService) {}
}
