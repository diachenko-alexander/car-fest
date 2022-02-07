import {Observable} from 'rxjs';

export abstract class UserApi {
  // @ts-ignore
  signIn: (username: string, password: string) => Observable<any>;
  // @ts-ignore
  signOut: () => Observable<any>;
}
