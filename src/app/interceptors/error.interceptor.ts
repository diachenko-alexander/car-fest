import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {Observable, throwError} from 'rxjs';
import {catchError,} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public userService: UserService ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        this.userService.signOut();
      }
      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }))
  }
}
