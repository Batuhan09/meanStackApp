import { Component, OnInit } from '@angular/core';
import { MessageApiService } from 'src/service/message-api.service';
import { UserService } from 'src/service/user.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  messages:any=[];
  counter = 1;
  currentUserName;
  currentUserId;
  isReversed = true;
  messageType;
  
  constructor(
    private messageService: MessageApiService,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private dialogRef : MatDialog
    ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(routeParams => {
      this.messageType = this.actRoute.snapshot.paramMap.get('type');
          this.currentUserName = this.userService.getUserPayload().name;
    this.currentUserId = this.userService.getUserPayload()._id;
    console.log(this.messageType)
    if(this.messageType== 'inbox'){
      this.messageService.getInbox(this.currentUserId,1,"-createdAt",false,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }
          }
          this.messages = res;
          console.log(res)
        },
        err => { 
          console.log(err);
          
        }
      );
    }else{
      this.messageService.getOutbox(this.currentUserId,1,"-createdAt",false,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }          }
          this.messages = res;
          console.log(res)
        },
        err => { 
          console.log(err);
          
        }
      );
    }
    });
  }

  openDialog(title, content){
    console.log()
    this.dialogRef.open(PopUpComponent,{
      data : {
        t: title,
        c: content
      }
    });
  }
  
  inc_counter(){
    this.counter+=1;
  }

  dec_counter(){
    this.counter-=1;
  }

  setIsReversed(){
    if(this.isReversed) this.isReversed = false;
    else this.isReversed = true;
  }


  getMessages(){
    if(this.messageType == 'inbox'){
      if(!this.isReversed){
        this.messageService.getInbox(this.currentUserId,this.counter,"createdAt",false,false).subscribe(
          res => {
            for (let i = 0; i < 5; i++) {
              if(res[i]){
                const element = res[i];
                element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
              }            }
            this.messages = res;
            console.log(res)
          },
          err => { 
            console.log(err);
            
          }
        );
      }else{
        this.messageService.getInbox(this.currentUserId,this.counter,"-createdAt",false,false).subscribe(
          res => {
            for (let i = 0; i < 5; i++) {
              if(res[i]){
                const element = res[i];
                element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
              }            }
            this.messages = res;
            console.log(res)
          },
          err => { 
            console.log(err);
            
          }
        );
      }
    }else{
      if(!this.isReversed){
        this.messageService.getOutbox(this.currentUserId,this.counter,"createdAt",false,false).subscribe(
          res => {
            for (let i = 0; i < 5; i++) {
              if(res[i]){
                const element = res[i];
                element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
              }            }
            this.messages = res;
            console.log(res)
          },
          err => { 
            console.log(err);
            
          }
        );
      }else{
        this.messageService.getOutbox(this.currentUserId,this.counter,"-createdAt",false,false).subscribe(
          res => {
            for (let i = 0; i < 5; i++) {
              if(res[i]){
                const element = res[i];
                element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
              }             }
            this.messages = res;
            console.log(res)
          },
          err => { 
            console.log(err);
            
          }
        );
      }
    }

  }

  removeMessage(message, index) {
    if(window.confirm('Are you sure?')) {
      if(this.messageType=="inbox"){message.trashByTo = true}
      else {message.trashByFrom = true  }
      let id = message._id;
      console.log("onSubmit - id : ",id  );
        this.messageService.updateMessage(message,id).subscribe({
          complete: () => {
            this.messages.splice(index, 1);
            console.log('Content deleted successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
  }

  sort(type){
    this.messages.sort((a, b) => {
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
}

