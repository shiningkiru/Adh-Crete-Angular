import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

interface Post {
  token:string;
  status: Boolean;
};

@Injectable({
  providedIn:'root'
})
export class AuthService {
  authService: any;
  apiUrl:String =environment.apiUrl;
  currentUser;
  token;
  constructor(private http:HttpClient , private router:Router) { 
    this.updateToken();
  }

  updateToken(){
    this.token= localStorage.getItem('token');
    if(this.token){
      this.currentUser=jwt_decode(this.token);
      //this.getAccessPrevilleges();
    }else{
      //dummy
      this.currentUser={
        "name":"user"
      }
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
          return true;
        }else{
          return false;
        }
    }));
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
