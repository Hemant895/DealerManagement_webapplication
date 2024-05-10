import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83';
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      
    }


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Token expired or invalid
          return new Observable<HttpEvent<any>>(observer => {
            observer.error(new HttpErrorResponse({ error: 'Token expired or invalid', status: 401 }));
          });
        }
        // Handle other errors
        return new Observable<HttpEvent<any>>(observer => {
          observer.error(new HttpErrorResponse({ error: 'An error occurred', status: error.status }));
        });
      }),
      switchMap(() => next.handle(request))
    )
  }
}
