import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChatBoxComponent } from './chat-box/chat-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
    {path: 'chat', component: ChatBoxComponent}
    ])
  ],
  declarations: [ChatBoxComponent]
})
export class ChatModule { }
