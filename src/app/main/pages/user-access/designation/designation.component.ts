import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddDesignationComponent } from '../components/add-designation/add-designation.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DesignationService } from 'app/shared/services/designation.service';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  rows: any[];
  // Private
  private _unsubscribeAll: Subject<any>;
  loadingIndicator=true;
  dialogRef: MatDialogRef<AddDesignationComponent>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(private _matDialog: MatDialog, private _serv: DesignationService, private alertService:AlertService)
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }
  
  ngOnInit(): void
  {
      this.getDesignation();
  }

  getDesignation(){
      this._serv.get().subscribe(response => {
          this.loadingIndicator=false;
          this.rows = response as any[];
      })
  }

  updateDesignation(data=null){
      this.dialogRef = this._matDialog.open(AddDesignationComponent, {
          disableClose: false,
          minWidth: "320px",
          width: "450px",
          maxWidth: "100%",
          data: data
      });

      
      this.dialogRef.afterClosed().subscribe(result=>{
          if(result == 'updated'){
              this.getDesignation();
          }
      })
  }

  deleteDesignation(row){
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
              this._serv.delete(row.id).subscribe(response=> {
                  this.alertService.openAletPanel("State deleted successfully",'','success');
                  this.getDesignation();
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
