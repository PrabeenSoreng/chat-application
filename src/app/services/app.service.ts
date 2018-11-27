import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'https://chatapi.edwisor.com';

  constructor(public http: HttpClient) { }

  public getUserFromLS() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInLS(data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public signup(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    return this.http.post(`${this.baseUrl}/api/v1/users/signup`, params);
  }

  public login(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.baseUrl}/api/v1/users/login`, params);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof Error) {
      errorMessage = `An error occured ${err.error.message}`;
    }
  }

}
