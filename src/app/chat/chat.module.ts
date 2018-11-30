import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChatBoxComponent } from './chat-box/chat-box.component';
import { SocketService } from '../services/socket.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RemoveSpecialCharPipe } from '../shared/pipe/remove-special-char.pipe';
import { ChatRouteGuard } from './chat-route-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
    {path: 'chat', component: ChatBoxComponent, canActivate: [ChatRouteGuard]}
    ]),
    SharedModule
  ],
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe],
  providers: [SocketService, ChatRouteGuard]
})
export class ChatModule { }
