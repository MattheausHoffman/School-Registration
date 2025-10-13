// src/app/guards/login-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const isLogged = localStorage.getItem('auth.logged') === 'true';
  if (isLogged) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { redirect: state.url }
  });
};
