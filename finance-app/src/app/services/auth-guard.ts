import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Basic check: Is there a token? 
  // Advanced: Use 'jwt-decode' to check if it's expired
  if (token) {
    return true; 
  }

  // If not logged in, send them to login page
  router.navigate(['/login']);
  return false;
};
