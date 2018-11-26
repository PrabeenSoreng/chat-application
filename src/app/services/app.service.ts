import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Cookie } from 'ng2-cookies/ng2-cookies'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'https://chatapi.edwisor.com';

  constructor(public http: HttpClient) { }

  public signup(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('passowrd', data.password)
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
