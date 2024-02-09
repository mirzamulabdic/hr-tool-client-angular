import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  return authService.currentUser$.pipe(
    map(user=> {

      if (!user) return false;

      if (user.roles.includes('Admin') || user.roles.includes('Manager')) {
        return true;
      } else {
        toastr.error("You don't have access!!");
        return false;
      }
    })
  );
};
