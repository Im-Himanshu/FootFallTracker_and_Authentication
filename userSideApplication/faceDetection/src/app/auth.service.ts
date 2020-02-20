
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  pendingNavigation = null;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
          //this.router.navigate(['/main']) // write a if condition of doing this only if the page is login/register
        }
        else {
          this.userDetails = null;
        }
      }
    );

  } l;

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.pendingNavigation = "/main"
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.pendingNavigation = "/main"
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.pendingNavigation = "/main" // navigate to main route after userdetails arrived
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.pendingNavigation = "/main"
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.pendingNavigation = "/main"
        }, err => reject(err))
    })
  }

  // doLogout() {
  //   return new Promise((resolve, reject) => {
  //     if (firebase.auth().currentUser) {
  //       this.afAuth.auth.signOut();
  //       this.pendingNavigation = "/login" //redirect to login 
  //       resolve();

  //     }
  //     else {
  //       reject();
  //     }
  //   });
  // }

  checkIfLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //https://fireship.io/snippets/check-if-current-user-exists-with-angularfire/
  async isLoggedIn() {
    const user = await this.checkIfLoggedIn();
    if (user) {
      return true;
    }
    return false;


  }


  logout() {
    this.afAuth.auth.signOut()
      .then((res) =>
        this.router.navigate(['/login']));
  }


}