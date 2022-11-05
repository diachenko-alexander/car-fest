import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@Injectable()
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.jwtHelper.isTokenExpired(token);
  }
}
