import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'https://chatapi.edwisor.com';

  constructor(private http: HttpClient) { }

  getUserFromLS() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  setUserInLS(data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  signup(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    return this.http.post(`${this.baseUrl}/api/v1/users/signup`, params);
  }

  login(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.baseUrl}/api/v1/users/login`, params);
  }

  logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))

    return this.http.post(`${this.baseUrl}/api/v1/users/logout`, params);

  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof Error) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

}
