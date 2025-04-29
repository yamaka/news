import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';
import { TokenStorageService } from '../core/services/token-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const HOST = environment.apiUrl; // Base API URL from environment
  const tokenStorageService = inject(TokenStorageService); // Inject TokenStorageService
  const token = tokenStorageService.getToken(); // Retrieve token from storage

  // Clone the request and modify it
  const modifiedRequest = req.clone({
    url: req.url.startsWith('http') ? req.url : `${HOST}${req.url}`, // Prepend HOST if the URL is relative
    setHeaders: token
      ? {
          Authorization: `Bearer ${token}`, // Add Authorization header if token exists
        }
      : {}, // No headers if token is null
  });
  debugger;
  // Pass the modified request to the next handler
  return next(modifiedRequest);
};
