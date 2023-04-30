import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageApiService } from 'src/service/message-api.service';
import { Message } from 'src/model/message';
import { LogService } from 'src/service/log.service';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  searchText: any;
  users: any = [];
  userSelected = false;
  edited = false;
  counter = 1;
  type;
  clicked = false
  selectedUserName;
  selectedUserRole;
  editForm: FormGroup;
  selectedUserId;
  constructor(public fb: FormBuilder, 
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageApiService,
    private router: Router
    ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(routeParams => {
    this.type = this.actRoute.snapshot.paramMap.get('type');
    if(this.type == "view-users"){
      this.selectedUserRole = this.userService.getUserPayload().role;
      if(this.selectedUserRole!="admin"){ this.router.navigateByUrl('/dashboard/message/inbox');}
      this.userService.getAllUsers(1).subscribe(
        res => {
          this.users = res;
        },
        err => { 
          console.log(err);
          
        }
      );
    }else{
      this.userService.getAllUsersWithoutPagination().subscribe(
        res => {
          this.users = res;
          console.log(res)
        },
        err => {
          console.log(err);
        }
      );
      this.editForm = this.fb.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]]
      });
    }
  })
  }

  inc_counter(){
    this.edited = false;
    this.counter+=1;
  }

  dec_counter(){
    this.counter-=1;
  }
  getUsers(){
    this.userService.getAllUsers(this.counter).subscribe(
      res => {
        this.users = res;
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  removeUser(user, index) {
    this.edited = true;
    console.log(user);
    if(window.confirm('Are you sure?')) {
        this.userService.deleteUser(user._id).subscribe({
          complete: () => {
            this.users.splice(index+1, 1);
          },
          error: (e) => {
            console.log(e);
          }
        }
      )    
    }
  }
  sort(type){
    this.users.sort((a, b) => {
      const nameA = a[type].toUpperCase(); // ignore upper and lowercase
      const nameB = b[type].toUpperCase(); // ignore upper and lowercase
      
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  sendMessage(id, name) {
    this.selectedUserId = id;
    this.selectedUserName = name;
    this.userSelected = true;
  }

  onSubmit() {
    this.clicked = true;
    if (!this.editForm.valid) {
      console.log(this.editForm)
      console.log("notvalid")
      return false;
    } else if(this.selectedUserName) {
      console.log(this.userService.getUserPayload())
      let message = new Message()
      message.content = this.editForm.value.content;
      message.title = this.editForm.value.title;
      message.to = this.selectedUserId;
      message.toName = this.selectedUserName;
      message.from = this.userService.getUserPayload()._id;
      message.fromName = this.userService.getUserPayload().userName;
      message.trashByFrom = false;
      message.trashByTo = false;
      message.deletedByFrom = false;
      message.deletedByTo = false;
      var currentdate = new Date(); 
      var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      message.createdAt = currentdate;
      this.messageService.addMessage(message).subscribe({
        complete: () => {
          this.userSelected = false;
          console.log('Content updated successfully!');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
