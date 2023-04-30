import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MessageApiService } from 'src/service/message-api.service';
import { UserService } from 'src/service/user.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  inboxTrash: any = [];
  outboxTrash: any = [];
  inboxCounter = 1;
  outboxCounter = 1;
  currentUserId;
  isReversedInbox = true;
  isReversedOutbox = true;
  constructor(
    private messageService: MessageApiService,
    private userService: UserService,
    private dialogRef: MatDialog

  ) { }

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserPayload()._id;
    this.messageService.getInbox(this.currentUserId, 1,"-createdAt",true,false).subscribe(
      res => {
        for (let i = 0; i < 5; i++) {
          if(res[i]){
            const element = res[i];
            element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
          }       
        this.inboxTrash = res;
        console.log(res)
        }
      },
      err => {
        console.log(err);
      }
    );
    this.messageService.getOutbox(this.currentUserId, 1,"-createdAt",true,false).subscribe(
      res => {
        for (let i = 0; i < 5; i++) {
          if(res[i]){
            const element = res[i];
            element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
          }  
        this.outboxTrash = res;
        console.log(res)
        }
      },
      err => {
        console.log(err);

      }
    );

  }

  incInboxCounter() {
    this.inboxCounter += 1;
  }

  decInboxCounter() {
    this.inboxCounter -= 1;
  }

  incOutboxCounter() {
    this.outboxCounter += 1;
  }

  decOutboxCounter() {
    this.outboxCounter -= 1;
  }


  setIsReversedInbox(){
    if(this.isReversedInbox) this.isReversedInbox = false;
    else this.isReversedInbox = true;
  }

  setIsReversedOutbox(){
    if(this.isReversedOutbox) this.isReversedOutbox = false;
    else this.isReversedOutbox = true;
  }
  openDialog(title, content) {
    console.log()
    this.dialogRef.open(PopUpComponent, {
      data: {
        t: title,
        c: content
      }
    });
  }

  getInboxMessages() {
    if(!this.isReversedInbox){
      this.messageService.getInbox(this.currentUserId, this.inboxCounter, "createdAt",true,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }  
          this.inboxTrash = res;
          console.log(res)
          }
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.messageService.getInbox(this.currentUserId, this.inboxCounter,"-createdAt",true,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }  
          this.inboxTrash = res;
          console.log(res)
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getOutboxMessages() {
    if(!this.isReversedOutbox){
      this.messageService.getOutbox(this.currentUserId, this.outboxCounter,"createdAt",true,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }  
          this.outboxTrash = res;
          console.log(res)
          }
        },
        err => {
          console.log(err);
  
        }
      );
    }else{
      this.messageService.getOutbox(this.currentUserId, this.outboxCounter,"-createdAt",true,false).subscribe(
        res => {
          for (let i = 0; i < 5; i++) {
            if(res[i]){
              const element = res[i];
              element.createdAt = moment(element.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }  
          this.outboxTrash = res;
          console.log(res)
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  removeMessage(message, index, messageType) {
    let messageId = message._id;
    if (window.confirm('Are you sure?')) {
      if (messageType == 0) {//inbox
        console.log("will deleted",message)
        if (message.deletedByFrom) {//delete message
          this.messageService.deleteMessage(messageId).subscribe({
            complete: () => {
              this.outboxTrash.splice(index, 1);
              console.log('Content deleted successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          })
        } else {//update message with message.DeletedByTo = true
          message.deletedByTo = true;
          this.messageService.updateMessage(message, messageId).subscribe({
            complete: () => {
              this.inboxTrash.splice(index, 1);
              console.log('Content deleted successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          });
        }
      } else {//outbox
        if (message.deletedByTo) {//delete message
          this.messageService.deleteMessage(messageId).subscribe({
            complete: () => {
              this.outboxTrash.splice(index, 1);
              console.log('Content deleted successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          })
        } else {//update message with message.DeletedByFrom = true
          message.deletedByFrom = true;
          this.messageService.updateMessage(message, messageId).subscribe({
            complete: () => {
              this.outboxTrash.splice(index, 1);
              console.log('Content deleted successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          });
        }

      }
    }
  }
  removeFromTrash(message, index, messageType) {
    let messageId = message._id;

    if (window.confirm('Are you sure?')) {
      if (messageType == 0) {//inbox
        message.trashByTo = false
        let id = message._id;
        console.log("onSubmit - id : ", id);
        this.messageService.updateMessage(message, id).subscribe({
          complete: () => {
            this.inboxTrash.splice(index, 1);
            console.log('Content regained successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
      else {//outbox
        message.trashByFrom = false
        let id = message._id;
        console.log("onSubmit - id : ", id);
        this.messageService.updateMessage(message, id).subscribe({
          complete: () => {
            this.outboxTrash.splice(index, 1);
            console.log('Content regained successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
  sortInboxTrash(type){
    this.inboxTrash.sort((a, b) => {
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
  sortOutboxTrash(type){
    this.outboxTrash.sort((a, b) => {
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




