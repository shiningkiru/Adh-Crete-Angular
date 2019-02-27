import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  userData:  Observable<User>;
  constructor(private _auth: AuthService, private _user: UserService) { 
    this.getUser();
  }

  getUser(){
    this.userData = this._user.getBy(this._auth.currentUser.userId).pipe(
      map( result => {
        return result as User;
      })
    )
  }
}
