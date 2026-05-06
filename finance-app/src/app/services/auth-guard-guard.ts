import { CanActivateFn, Router } from '@angular/router';
import { UserProfile } from './user-profile';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
    const userProfile = inject(UserProfile);
    const auth = inject(Auth);
    const router = inject(Router);
    const username:string = userProfile.userDetails.getValue().userName;
    if (!auth.isAuthenticated(username, userProfile.userDetails.getValue().hashedPassword)) {
      router.navigate(['login']);
      return false;
    }

    return true;
  }
