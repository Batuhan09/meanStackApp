
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  UserGender = ["M","F"]
  default : any = "M";
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let user = new User();
    user.email = form.value.email;
    user.userName = form.value.userName;
    user.nameAndSurname = form.value.nameAndSurname;
    user.password = form.value.password;
    user.birthdate = form.value.birthdate;
    user.gender = form.value.gender;
    alert(user.gender);
    alert(user.birthdate);
    user.role = "regular";
    this.userService.postUser(user).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      userName: '',
      nameAndSurname: '',
      password: '',
      email: '',
      role: '',
      gender: '',
      birthdate: new Date()
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}