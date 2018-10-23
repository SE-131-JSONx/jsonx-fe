import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { LoadingService } from '../../services/loading.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(public authService: BackendService,
              private router: Router,
              public loadingService: LoadingService) {
    if (authService.isAuthenticated) {
      router.navigateByUrl('/dashboard');
    }
  }

  getUserErrorMessage() {
    return this.username.hasError('required') ? 'Username is required' : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }
  login() {
    this.loadingService.start('Logging in...');
    this.authService.login(this.username.value, this.password.value, (error, r) => {
      if (!error) {
        this.router.navigateByUrl('/dashboard');
      }
      this.loadingService.stop();
    });
  }

  ngOnInit() {
  }
}
