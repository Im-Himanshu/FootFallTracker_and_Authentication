import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {




  loginForm: any;
  errorinLoginForm = {
    email: false,
    password: false,
    repassword: false
  };
  errorMessage: string = '';
  successMessage: string = '';
  notValid = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {

  }


  tryRegister() {
    if (this.formHasError()) {
      return;
    }
    this.authService.doRegister(this.loginForm)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  formHasError() {
    let hasError = false;
    if (this.loginForm.email) {
      this.errorinLoginForm.email = false;

    }
    else {
      this.errorinLoginForm.email = true;
      hasError = true;
    }

    if (this.loginForm.password) {
      this.errorinLoginForm.password = false;
    }
    else {
      this.errorinLoginForm.password = true;
      hasError = true

    }

    if (this.loginForm.repassword) {
      if (this.loginForm.repassword !== this.loginForm.password) {
        hasError = true;
        this.errorinLoginForm.repassword = true;
      }
      else {
        this.errorinLoginForm.repassword = false;
      }
    }
    else {
      hasError = true;
      this.errorinLoginForm.repassword = true;
    }
    return hasError;
  }



  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/main']);
      })
  }

  // tryTwitterLogin(){
  //   this.authService.doTwitterLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/main']);
      })
  }




}
