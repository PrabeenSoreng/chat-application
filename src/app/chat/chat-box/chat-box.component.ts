import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('scrollMe', {read: ElementRef}) scrollMe: ElementRef;

  authToken: any;
  userInfo: any;
  userList: any = [];
  disconnectedSocket: boolean;
  scrollToChatTop: boolean = false;

  receiverId: any;
  receiverName: any;
  priviousChatList: any = [];
  messageText: any;
  messageList: any = [];
  pageValue: number = 0;
  loadingPreviousChat: boolean = false;


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
    this.getMessageFromUser();
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

  getPreviousChatWithAUser() {
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);
    this.socketService.getChat(this.userInfo.userId, this.receiverId, this.pageValue * 10)
      .subscribe(response => {
        console.log(response);

        if(response.status === 200){
          this.messageList = response.data.concat(previousData);
        } else {
          this.messageList = previousData;
          console.log("No message available");
        }

        this.loadingPreviousChat = false;
      }, err => {
        console.log("Some error occured");
      });
  }

  loadEarlierPageOfChat() {
    this.loadingPreviousChat = true;

    this.pageValue++;
    this.scrollToChatTop = true;

    this.getPreviousChatWithAUser();
  }

  userSelectedToChat(id, name) {
    console.log('Setting user as active');
    this.userList.map(user => {
      if(user.userId == id) user.chatting = true;
      else user.chatting = false;
    });

    Cookie.set('receiverId', id);
    Cookie.set('receiverName', name);

    this.receiverName = name;
    this.receiverId = id;
    this.messageList = [];
    this.pageValue = 0;

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }

    this.socketService.markChatAsSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }

  sendMessageUsingKeypress(event: any) {
    if(event.keyCode === 13) this.sendMessage();
  }

  sendMessage() {
    if(this.messageText) {
      let chatMsgObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      }
      console.log(chatMsgObject);
      this.socketService.SendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);
    } else {
      console.log('Text msg cannot be emply');
    }
  }

  pushToChatWindow(data) {
    this.messageText = "";
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }

  getMessageFromUser() {
    this.socketService.chatByUserId(this.userInfo.userId)
      .subscribe(data => {
        (this.receiverId == data.senderId) ? this.messageList.push(data) : '';
        console.log(`${data.senderName} says : ${data.message}`);
        this.scrollToChatTop = false;
      });
  }

  logout() {
    this.appService.logout()
      .subscribe(response => {
        if(response.status === 200){
          console.log("Logout called");
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        } else {
          console.log(response.message);
        }
      }, err => {
        console.log('Some error occured');
      });
  }

}