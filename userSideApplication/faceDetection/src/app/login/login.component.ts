import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
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

    this.redirectIfLogin();

  }

  async redirectIfLogin() {
    const user = await this.authService.checkIfLoggedIn();
    if (user) { // if user details exist then go to main... 
      this.router.navigate(['/main']);
    }

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
        this.router.navigate(['/main']);
        console.log("user Login successFull")
      })
  }


}
