import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {




  loginForm: any = {};
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router) {

  }



  doEmailPasswordLogin() {
    this.authService.doLogin(this.loginForm).then(data => {
      // if successfull go to main 
      this.router.navigate(['/main']);
    })
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
        console.log("user Login successFull")
      })
  }


}
