

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//import { environment } from '../../environments/environment';
import { User } from 'src/model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User()
  baseUrl = 'http://localhost:4000/api/user'
  selectedUser: User = {
    userName: '',
    nameAndSurname: '',
    password: '',
    email: '',
    role: '',
    gender: '',
    birthdate: new Date()
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(this.baseUrl+'/register',user);
  }

  login(authCredentials) {
    console.log("authCredentials", authCredentials);
    return this.http.post(this.baseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  getAllUsers(page){
    return this.http.get(this.baseUrl+'?page='+page);
  }

  getAllUsersWithoutPagination(){
    return this.http.get(this.baseUrl);
  }
   // Get employee
   getUser(id): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update employee
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  addUser( data): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
    // Delete user
    deleteUser(id): Observable<any> {
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

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    console.log("token",token);
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      this.user.role = JSON.parse(userPayload).role;
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}