import { CanActivateFn, Router } from '@angular/router';
import { UserProfile } from './user-profile';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { environment } from '../../environments/environment';
import { map, catchError, of } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const userProfile = inject(UserProfile);
  const auth = inject(Auth);
  const router = inject(Router);
  const username: string = userProfile.userDetails.getValue().userName;
  return http.get<User>(`${environment.apiUrl}/user?username=${username}`)
    .pipe(
      map(response => {
        const hashedPassword = response.passwordHash;
        if (!auth.isAuthenticated(userProfile.userDetails.getValue().password, hashedPassword)) {
          router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(err => {
        return of(false);
      })
    );
}
