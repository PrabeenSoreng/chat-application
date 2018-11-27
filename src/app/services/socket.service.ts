import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseUrl = 'https://chatapi.edwisor.com';
  private socket;

  constructor() {
    this.socket = io(this.baseUrl);
  }

  verifyUser() {
    return Observable.create(observer => {
      this.socket.on('verifyUser', data => {
        observer.next(data);
      });
    });
  }

  onlineUserList() {
    return Observable.create(observer => {
      this.socket.on('online-user-list', userList => {
        observer.next(userList);
      });
    });
  }

  disconnectedSocket() {
    return Observable.create(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }

  setUser(authToken) {
    this.socket.emit('set-user', authToken);
  }

  // private handleError(err: HttpErrorResponse) {
  //   let errorMessage = '';
    
  //   if(err.error instanceof Error){
  //     errorMessage = `An error occured: ${err.error.message}`;
  //   }
  //   else {
  //     errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
  //   }

  //   console.log(errorMessage);
  //   return Observable.throw(errorMessage);
  // }
}
