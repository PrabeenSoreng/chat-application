import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChatBoxComponent } from './chat-box/chat-box.component';
import { SocketService } from '../services/socket.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
    {path: 'chat', component: ChatBoxComponent}
    ])
  ],
  declarations: [ChatBoxComponent],
  providers: [SocketService]
})
export class ChatModule { }
