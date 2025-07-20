import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../feature/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticate()) {
    // Stocke l'URL demandée pour redirection après login
    const returnUrl = state.url ;
    console.log(`Utilisateur non authentifié, redirection vers login (returnUrl: ${returnUrl})`);
    
    router.navigate(['/auth/login'], returnUrl ? { queryParams: { returnUrl } } : undefined);
    return false;
  }

  return true;
};