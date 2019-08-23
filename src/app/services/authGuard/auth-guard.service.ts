import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router) {

     }

    canActivate(): boolean {
      if (!this.authService.isLoggedIn) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}
