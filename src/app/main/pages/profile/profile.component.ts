import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/Models/user';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    currentUserId;
    currentUser;
    /**
     * Constructor
     */
    constructor(public _auth: AuthService, private router: Router, private _serv: UserService, private activatedRoute: ActivatedRoute)
    {
        if(router.url == '/admin/profile'){
            this.currentUserId = this._auth.currentUser.userId;
        }else{
            this.currentUserId = this.activatedRoute.snapshot.params.id;
        }
        this.getCurrentUser();
    }

    getCurrentUser() {
        this._serv.getBy(this.currentUserId).subscribe(response => {
            this.currentUser = response as User;
        })
    }
}
