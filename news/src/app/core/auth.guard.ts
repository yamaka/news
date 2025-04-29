import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
// Make sure the path to AuthService is correct
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Navigate to login page with return url
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
