import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/services/app.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  authToken: any;
  userInfo: any;
  receiverId: any;
  receiverName: any;
  userList: any = [];
  disconnectedSocket: boolean;

  constructor(
    private router: Router,
    private socketService: SocketService,
    private appService: AppService) {
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
  }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserFromLS();
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
  }

  checkStatus() {
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null){
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  verifyUserConfirmation() {
    this.socketService.verifyUser()
      .subscribe(data => {
        this.disconnectedSocket = false;
        this.socketService.setUser(this.authToken);
        this.getOnlineUserList();
      })
  }

  getOnlineUserList() {
    this.socketService.onlineUserList()
      .subscribe(userList => {
        this.userList = [];

        for(let x in userList) {
          let temp = {'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false};
          this.userList.push(temp);
        }

        console.log(this.userList);
      });
  }
}
