import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Message } from 'src/model/message';
@Injectable({
  providedIn: 'root'
})
export class MessageApiService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  message = new Message()
  baseUrl = 'http://localhost:4000/api/message'
  selectedMessage: Message = {
    from: '',
    fromName: '',
    to: '',
    toName: '',
    title: '',
    content: '',
    createdAt: undefined,
    trashByFrom: false,
    trashByTo: false,
    deletedByFrom: false,
    deletedByTo: false,
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  getInbox(id,page,sort,trash, deletedByTo): Observable<any> {
    let url = `${this.baseUrl}/inbox/${id}`+`?page=`+page+"&size=5&sort="+sort+"&trashByTo="+trash+"&deletedByTo="+deletedByTo;
    console.log(url)
    return this.http.get(url);

  }

  updateMessage(data, id): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  getOutbox(id,page,sort,trash, deletedByFrom): Observable<any> {
    let url = `${this.baseUrl}/outbox/${id}`+`?page=`+page+'&sort='+sort+"&trashByFrom="+trash+"&deletedByFrom="+deletedByFrom;
    console.log(url)
    return this.http.get(url);
  }


  getAllMessages(page){
    return this.http.get(this.baseUrl+'?page='+page);
  }

   getMessage(id): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update employee
  // updateUser(id, data): Observable<any> {
  //   let url = `${this.baseUrl}/update/${id}`;
  //   return this.http
  //     .put(url, data, { headers: this.headers })
  //     .pipe(catchError(this.errorMgmt));
  // }

  addMessage( data): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
    // Delete user
    deleteMessage(id): Observable<any> {
      let url = `${this.baseUrl}/${id}`;
      return this.http
        .delete(url, { headers: this.headers })
        .pipe(catchError(this.errorMgmt));
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
  //Helper Methods

  
}

