import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from 'app/shared/services/user.service';
import { AlertService } from 'app/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  rows: any[];
  // Private
  private _unsubscribeAll: Subject<any>;
  loadingIndicator=true;
  isAdmin= false;
  url="/staff";
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(private _matDialog: MatDialog, private _serv: UserService, private alertService:AlertService, private router: Router)
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
      if(this.router.url == '/admin/all-admins'){
        this.isAdmin=true;
        this.url="/admin";
      }  
  }
  
  ngOnInit(): void
  {
      this.getUsers();
  }

  getUsers(){
      this._serv.getByURL(this.url).subscribe(response => {
          this.loadingIndicator=false;
          this.rows = response as any[];
      })
  }


  deleteUser(row){
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
              this._serv.delete(row.id).subscribe(response=> {
                  this.alertService.openAletPanel("User deleted successfully",'','success');
                  this.getUsers();
              });
          }
          this.confirmDialogRef = null;
      });
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
