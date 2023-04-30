import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  currentUserId;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUserId = this.userService.getUserPayload()._id;
    //const date = moment();
    //    let dateInFormat = date.format('YYYY.M.D');
    //    console.log(dateInFormat);
    this.userService.getUser(this.currentUserId).subscribe(
      value => {
        console.log(value)
        this.userDetails = value
        let dateInFormat = moment(value.birthdate).format('DD/MM/YYYY');
        this.userDetails.birthdate = dateInFormat
      },
      error => { console.log(error); 
      }
    );
  }


}