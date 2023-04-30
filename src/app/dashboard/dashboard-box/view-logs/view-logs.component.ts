import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Log } from 'src/model/log';
import { LogService } from 'src/service/log.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {
  logs:any=[];
  counter = 1;
  edited = false;
  isReversed = true;
  constructor(private userService: UserService,
    private logService: LogService) { }

  ngOnInit() {
    this.logService.getAllLogs(1,"-time").subscribe(
      res => {
        for (let i = 0; i < 10; i++) {
           const element = res[i];
           element.time = moment(element.time).format("DD/MM/YYYY hh:mm:ss a")
        }
        console.log("here")
        this.logs = res;
        console.log("logss",this.logs)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  inc_counter(){
    this.edited = false;
    this.counter+=1;
  }

  dec_counter(){
    this.counter-=1;
  }

  setIsReversed(){
    if(this.isReversed) this.isReversed =false;
    else this.isReversed = true;
  }

  getLogs(){
    if(!this.isReversed){
      this.logService.getAllLogs(this.counter,"time").subscribe(
        res => {
          this.logs = res;
          console.log(res)
        },
        err => { 
          console.log(err);
          
        }
      );
    }else{
      this.logService.getAllLogs(this.counter,"-time").subscribe(
        res => {
          this.logs = res;
          console.log(res)
        },
        err => { 
          console.log(err);
        }
      );
    }
  }
  sort(type){
    this.logs.sort((a, b) => {
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