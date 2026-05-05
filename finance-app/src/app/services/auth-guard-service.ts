import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth';
import { UserProfile } from './user-profile';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: Auth, public router: Router, private userProfile: UserProfile) {}
  canActivate(): boolean {
    const username:string = this.userProfile.getValue().userName;
    if (!this.auth.isAuthenticated(username, UserProfile.hashedPassword)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}