import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies'; 
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const data = form.value;
    this.appService.login(data)
      .subscribe(response => {
        if(response.status === 200){
          console.log(response);
          Cookie.set('authToken', response.data.authToken);
          Cookie.set('receiverId', response.data.userDetails.userId);
          Cookie.set('receiverName', response.data.userDetails.firstName+' '+response.data.userDetails.lastName);
          this.appService.setUserInLS(response.data.userDetails);
          this.router.navigate(['/chat']);
        }
        else
         console.log('Error Occured');
      });
  }

}
