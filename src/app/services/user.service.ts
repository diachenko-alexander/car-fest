import {Injectable} from '@angular/core';
import {UserApi} from '../../spa/users/user-api';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import {HttpClient, HttpBackend} from '@angular/common/http';
import {User} from '../../spa/services/user.interface';
import {RegistrationResponseDto} from '../../spa/interfaces/RegistrationResponseDto.interface';
import {AuthResponseDto} from '../../spa/interfaces/AuthResponseDto.interface';
import {UserForAuthenticationDto} from '../../spa/interfaces/UserForAuthenticationDto.interface';
import {AuthService} from './auth.service';

@Injectable()
export class UserService implements UserApi {
  isAuthenticated = this.authService.isAuthenticated();
  dataTransfer: Array<any>;
  private url = 'https://localhost:5001/api/accounts';
  public http: HttpClient;

  constructor(public router: Router, public handler: HttpBackend, public authService: AuthService) {
    this.dataTransfer = null;
    this.http = new HttpClient(handler);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponseDto>(this.url + '/Login', {
      email: email,
      password: password
    }).pipe(map((response) => {
      if (response.isAuthSuccessful && response.errorMessage == null) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.userFirstName)
        this.isAuthenticated = true;
      }
    }));
  }

  // @ts-ignore
  signOut(): Observable<any> {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/sign-in']);
    return of({});
  }

  registerUser(registerform: User): Observable<any> {
    return this.http.post<RegistrationResponseDto>(this.url + '/registration', {
      firstName: registerform.firstName,
      lastName: registerform.lastName,
      email: registerform.email,
      password: registerform.password,
      confirmPassword: registerform.confirmPassword
    });
  }
}


