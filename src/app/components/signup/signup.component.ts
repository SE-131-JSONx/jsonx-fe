import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  constructor() { }

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
    // call to BackendService.signUp() - services/backend.service.ts
    // see Login Component for example on proper structure - components/login.component.ts
  }

}
