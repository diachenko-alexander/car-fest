import {Injectable} from '@angular/core';
import {UserApi} from '../../spa/users/user-api';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User, RegistrationResponseDto} from '../../spa/services/user.interface';

@Injectable()
export class UserService implements UserApi {
  isAuthenticated = false;
  // dataTransfer: Array<any>;
  private url = 'https://localhost:5001/api/accounts/registration';

  constructor(public router: Router, public http: HttpClient) {
    // this.dataTransfer = null;
  }

  // @ts-ignore
  signIn(email: string, password: string): Observable<any> {
    if (email === '123@123.com' && password === '123'){
      this.isAuthenticated = true;
      return of({}).pipe(delay(2000));
    } else {return throwError('Invalid password'); }
    // return this.http.get<User[]>(this.url).pipe(map((response) => {
    //   const arrayFilter: User[] = response.filter((item) =>
    //     item.email === email && item.password === password);
    //   if (arrayFilter.length !== 0) {
    //     this.isAuthenticated = true;
    //     // this.dataTransfer = [arrayFilter[0].name];
    //     localStorage.setItem('user', JSON.stringify(arrayFilter[0].name));
    //   } else {
    //     throw new Error('Invalid password');
    //   }
    // }));

  }

  // @ts-ignore
  signOut(): Observable<any> {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/sign-in']);
    return of({});
  }

  registerUser(registerform: User): Observable<any> {
    return this.http.post<RegistrationResponseDto>(this.url, {
      firstName: registerform.firstName,
      lastName: registerform.lastName,
      email: registerform.email,
      password: registerform.password,
      confirmPassword: registerform.confirmPassword
    });
  }
}


