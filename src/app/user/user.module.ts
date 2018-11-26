import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'signup', component: SignupComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class UserModule { }
