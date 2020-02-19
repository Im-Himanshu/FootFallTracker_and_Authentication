import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router,
    private authService: AuthService,
    private toastcntrl: ToastController) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    async () => {
      const toast = await this.toastcntrl.create({
        message: "UnAuthorized!! please login First!!!",
        duration: 3000
      });
      toast.present();

    }
    return false;
  }

}
