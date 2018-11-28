import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseUrl = 'https://chatapi.edwisor.com';
  private socket;

  constructor(private http: HttpClient) {
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

  markChatAsSeen(userDetails) {
    this.socket.emit('mark-chat-as-seen', userDetails);
  }

  getChat(senderId, receiverId, skip): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authToken')}`).pipe(
      tap(data => console.log("Data Received")),
      catchError(this.handleError)
    )
  }

  chatByUserId(userId) {
    return Observable.create(observer => {
      this.socket.on(userId, data => {
        observer.next(data);
      });
    });
  }

  SendChatMessage(chatMsgObject) {
    this.socket.emit('chat-msg', chatMsgObject);
  }

  exitSocket() {
    this.socket.disconnect();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    
    if(err.error instanceof Error){
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
