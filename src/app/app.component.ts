import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { BackendService } from './services/backend.service';

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
    '/myprofile': 'my profile',
    '/explorer': 'explorer',
    '/json': 'my json',
  };

  constructor(public router: Router, public loadingService: LoadingService, public authService: BackendService) {}
}
