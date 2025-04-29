import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Logging Interceptor Functional Error:', error);

      const status = error?.status;

      if (status === 401 || status === 403) {
        authService.logout();
      }

      return throwError(() => error);
    })
  );
};
