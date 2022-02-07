import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public router: Router, public userSerVice: UserService) {
  }

  canActivate(): boolean {
    if (!this.userSerVice.isAuthenticated) {
      this.router.navigate(['/sign-in']);
    }
    return this.userSerVice.isAuthenticated;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
