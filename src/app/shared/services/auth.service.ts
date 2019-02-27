import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Store } from '@ngrx/store';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import * as UserActions from '../../ngrx/actions/user.actions';
import { UserService } from './user.service';

interface Post {
  token:string;
  status: Boolean;
};

@Injectable({
  providedIn:'root'
})
export class AuthService implements OnInit {
  authService: any;
  apiUrl:String =environment.apiUrl;
  currentUser;
  token;
  loggedInUser: Observable<{user: User}>;
  imageUrl = environment.imageUrl;
  constructor(private http:HttpClient , private router:Router, private _user: UserService, private store: Store<{user: {user: User}}>) { 
    this.updateToken();
    this.loggedInUser = this.store.select('User');
  }

  ngOnInit() {
  }

  updateToken(){
    this.token= localStorage.getItem('token');
    if(this.token){
      this.currentUser=jwt_decode(this.token);
    }
  }

  public static getToken() {
    return localStorage.getItem('token');
  }

  login(credentials) { 
    return this.http.post<Post>(this.apiUrl+'login', credentials).pipe(map(res => {
        if(res && res.status){
          localStorage.setItem('token', res.token);
          this.currentUser=jwt_decode(res.token);
          
          this.getLoggedInUser();
          return true;
        }else{
          return false;
        }
    }));
  }

  getLoggedInUser(){
    if(this.currentUser)
    this._user.getBy(this.currentUser.userId).subscribe(response => {
      let user = this._user.createconverNullToString(response as User);
      this.store.dispatch(new UserActions.UpdateUser(user));
    })
  }

  isloggedin(){
   this.token= localStorage.getItem('token');
    if( this.token )return true;
    else return false;
  }
 
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    location.reload();
  }

}
