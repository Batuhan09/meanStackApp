import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Log } from 'src/model/log';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  log = new Log()
  baseUrl = 'http://localhost:4000/api/log'
  selectedLog: Log = {
    userId: '',
    userName: '',
    ip: '',
    browser: '',
    time: undefined,
    actionType: '',
    dataType: '',
    status: '',
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient, private userService: UserService) { }

  createLog(actionType, dataType, status){
    var log = new Log();
    var user = this.userService.getUserPayload();
    console.log("user : ",user)
    log.userId = user?._id;
    log.userName = user?.userName;
    log.actionType = actionType;
    log.dataType = dataType;
    log.status = status;
    this.addLog(log).subscribe({
      complete: () => {
        console.log('Log added!');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }


  addLog( data): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  getAllLogs(page,sort){
    return this.http.get(this.baseUrl+'?page='+page+'&size=10'+'&sort='+sort);
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  
}

