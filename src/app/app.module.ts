import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './services/app.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    ChatModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', component: LoginComponent}
    ])
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
