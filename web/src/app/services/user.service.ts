import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { config, ServiceFlavor } from '../config/client_config';
import { UserProfile } from '../lib/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new Headers();

  constructor(private httpService: Http) {
    this.headers.set('Jwt', localStorage.getItem('Jwt'));
  }

  private readonly GET_USER_PROFILE_API = '/user/api/user-profile';
  private readonly POST_USER_LOGIN = '/user/api/user-login';
  private readonly POST_USER_UPDATE_PASSWORD = '/user/api/update-password';
  private readonly POST_USER_CONFIRM_BIRTHDAY = '/user/api/confirm-birthday';

  private userProfile: Observable<UserProfile | undefined> = undefined;

  public getCachedUserProfile(): Observable<UserProfile | undefined> {
    return this.userProfile || this.getUserProfile();
  }

  public getUserProfile(): Observable<UserProfile | undefined> {
    switch (config.getFlavor()) {
      case ServiceFlavor.LOCAL: {
        return this.userProfile || of(undefined);
      }
      case ServiceFlavor.PROD: {
        return (this.userProfile = this.httpService
          .get(this.GET_USER_PROFILE_API, {
            headers: this.headers
          })
          .pipe(
            map(data => {
              const token = data.headers.get('Jwt');
              if (token) {
                localStorage.setItem('Jwt', token);
              }
              const res = data.json();
              return Object.keys(res).length > 0 ? res : undefined;
            }),
            catchError(error =>
              throwError(`Error when getting user profile: ${error}`)
            )
          ));
      }
    }
  }

  public login(pass: string): Observable<boolean> {
    switch (config.getFlavor()) {
      case ServiceFlavor.LOCAL: {
        this.userProfile = of<UserProfile>({
          name: 'he',
          userId: 'mockId'
        });
        return of(true);
      }
      case ServiceFlavor.PROD: {
        return this.httpService
          .post(
            this.POST_USER_LOGIN,
            { password: pass },
            {
              headers: this.headers
            }
          )
          .pipe(
            map(data => {
              localStorage.setItem('Jwt', data.headers.get('Jwt'));
              this.userProfile = of(data.json() as UserProfile);
              return true;
            }),
            catchError(error => throwError(`Error when login: ${error}`))
          );
      }
    }
  }

  public updatePassword(password: string): Observable<boolean> {
    switch (config.getFlavor()) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
        return this.httpService
          .post(
            this.POST_USER_UPDATE_PASSWORD,
            { password },
            {
              headers: this.headers
            }
          )
          .pipe(
            map(data => {
              localStorage.setItem('Jwt', data.headers.get('Jwt'));
              return data.json();
            }),
            catchError(error => throwError(`Error when login: ${error}`))
          );
      }
    }
  }

  public confirmBirthday(birthday: string) {
    switch (config.getFlavor()) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
        return this.httpService
          .post(
            this.POST_USER_CONFIRM_BIRTHDAY,
            { birthday },
            {
              headers: this.headers
            }
          )
          .pipe(
            map(data => {
              localStorage.setItem('Jwt', data.headers.get('Jwt'));
              return data.json() as boolean;
            }),
            catchError(error => throwError(`Error when login: ${error}`))
          );
      }
    }
  }
}
