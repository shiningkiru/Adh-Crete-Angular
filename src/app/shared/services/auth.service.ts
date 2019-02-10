import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { finalize, tap } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Post {
    status: boolean;
    token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authService: any;
  apiUrl:String =environment.apiUrl;
  currentUser;
  token;
  constructor(private http:HttpClient , private router:Router) { 
  this.token= localStorage.getItem('token');
  
    if(this.token){
      this.currentUser=jwt_decode(this.token);
      //console.log(this.currentUser)
    }else{
      //dummy
      this.currentUser={
        "name":"user"
      }
    }
  }
  public static getToken() {
    //localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MzA1NDkwODEsImV4cCI6MTU2NjU0OTA4MSwidXNlcklkIjo0LCJmdWxsTmFtZSI6InNoaXZhIiwiZW1haWwiOiJzaGl2YUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjM0Iiwicm9sZXMiOiJST0xFX0FETUlOIn0.Mi8H5NnMc8953yjit2-E2nw9dEXnpV8TVVdiD_QexxpAaHR2crX4Gosu1KaBZWNzfJtB4Am7zUuIeAXsiaUWOCDgrh6CGZYB9OnUIJyBbBIIw5U-52QMgPZTpqGwiCt1wTmPT358spJWK3_DCOCFcAUwMGqu0aJ0jBYic3gvz20KxEqh0Dga_0HocMLS7SERbLBW2pGJUKdSrXlbBb0QQ9Z6Y98iCCdYaXFWt3_9Xj5xO8YjxLRNWJ_gaMG3LsoJisKa9sWFXD_VK0v4xj5dMAgJG18QtUYqa4odrVGMFVI_rBnqEHEwyFBj5GRWLs3toCUijprBF5GaMdq6xEIsjHw7cmA79O2nuMqdcjOijplAjbKSe59FyMGq1hTTyvuBfYi46wkItNmguPR4NVpDNvyxvCk5uA67LBeX4SnsDcx505Le9TffcpeJgQTX8eneMShNXE3gwN50cNtftnui0QvLP5wJEKdgmM3ZqGrl-HROEz0BJ8hbBLAejdNGyJ0SFJLPIsQtWn30HjolwhwVL28ImKY7VRkYgCYfdCVY92C72KtKzQUr5U3_e1CNJxSUMIC6lLWmFTGyJj3FnAG23TO_Z02KxkEoOW-xALLz_NRi8XBdnSdMdCM4kWQHCQ4bVttePP4TC9pGJ3DayFTE2z8b-lLMi7mLj98eHkY0XCY');
      return localStorage.getItem('token');
  }

  login(credentials) { 
    // get users from api
    
    //return this.http.post('http://127.0.0.1:8000/login-check', credentials);
    return this.http.post<Post>(this.apiUrl+'login-check', credentials).map(res => {
       
        if(res && res.status){          
          localStorage.setItem('token', res.token);
          this.currentUser=jwt_decode(res.token);
          return true;
        }else{
          return false;
        }
    });
  }

  isloggedin(){
   this.token= localStorage.getItem('token');
    if( this.token )
        return true;
    else 
        return false;
  }

 
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['authentication']);
    location.reload();
  }

}
