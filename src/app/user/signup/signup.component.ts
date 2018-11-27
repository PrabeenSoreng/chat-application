import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    console.log(data);
    this.appService.signup(data)
      .subscribe(response => {
        console.log('Success ', response)
        this.router.navigate(['/login']);
      });
  }

}
