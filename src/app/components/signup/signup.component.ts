import { BackendService } from '../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public authService: BackendService,
    private router: Router,
    public loadingService: LoadingService) {
      if (authService.isAuthenticated) {
      router.navigateByUrl('/dashboard');
    }
  }
  ngOnInit() {
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'First name is required' : '';
  }
  getSurnameErrorMessage() {
    return this.surname.hasError('required') ? 'Last name is required' : '';
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    } else if (this.email.hasError('email')) {
      return 'Email is invalid';
    } else {
      return '';
    }
  }
  getUserErrorMessage() {
    return this.username.hasError('required') ? 'Username is required' : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }

  signUp() {
    this.loadingService.start('Signing up...');
    this.authService.signUp(this.name.value, this.surname.value, this.email.value, this.username.value, this.password.value,
      (error, r) => {
        if (!error) {
          this.router.navigateByUrl('/login');
        }
        this.loadingService.stop();
     });
  }

}
