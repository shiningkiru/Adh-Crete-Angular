import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent  implements OnInit, OnChanges, OnDestroy
{
    about: any;
    workFieldHash="def";
    @Input('user') user;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    ngOnChanges() {
        let designation = (this.user)?this.user.designation:null;
        if(designation){
            if(designation.targetArea == 'country')this.workFieldHash="a";
            if(designation.targetArea == 'state')this.workFieldHash="ab";
            if(designation.targetArea == 'region')this.workFieldHash="abc";
            if(designation.targetArea == 'city')this.workFieldHash="abcd";
            if(designation.targetArea == 'block')this.workFieldHash="abcde";
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
