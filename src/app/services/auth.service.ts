import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginRes, IUser } from '../Model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = environment.rootUrl + '/users/login';
  private signupUrl = environment.rootUrl + '/users/signup';
  private httpClient = inject(HttpClient);

  constructor() {
    /* TODO document why this constructor is empty */
  }

  // state$ = new BehaviorSubject<IUser>({
  //   _id: '',
  //   email: '',
  //   fullname: '',
  //   jwt: '',
  // });
  loggedInState$ = new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<ILoginRes> {
    const res = this.httpClient.post<ILoginRes>(this.loginUrl, {
      email,
      password,
    });
    console.log('login()-res: ', res);
    return res;
  }

  signup(
    fullname: string,
    email: string,
    password: string
  ): Observable<ILoginRes> {
    const res = this.httpClient.post<ILoginRes>(this.signupUrl, {
      email,
      password,
      fullname,
    });
    console.log('signup()-res: ', res);
    return res;
  }

  isLoggedin() {
    // if (this.getAppState() != null) {
    //   return true;
    // }
    return this.loggedInState$.value;
  }

  getUserInfo() {
    const appState = this.getAppState() || '';
    console.log('appState: ', appState);
    if (appState.length > 0) {
      const user = JSON.parse(appState);
      console.log('user: ', user);
      if (user) {
        return user;
      } else {
        return null;
      }
    }
    return null;
  }

  getAppState() {
    console.log('get APPSTATE');
    return localStorage.getItem('APPSTATE');
  }

  saveLoggedinState(user: IUser) {
    console.log('save APPSTATE');
    localStorage.setItem('APPSTATE', JSON.stringify(user));
    this.loggedInState$.next(true);
  }

  logout() {
    console.log('logout');
    localStorage.clear();
    this.loggedInState$.next(false);
  }
}
