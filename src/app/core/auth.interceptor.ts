import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_URL } from './api.config';
import { AuthService } from './auth.service';

/** Adds the login token to admin requests and signs the user out if the server says 401. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isAdminCall = req.url.startsWith(`${API_URL}/admin`) || req.url.startsWith(`${API_URL}/auth/change-password`);

  if (isAdminCall && auth.token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${auth.token}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && isAdminCall) auth.logout();
      return throwError(() => err);
    })
  );
};
