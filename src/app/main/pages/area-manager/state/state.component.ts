import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'app/shared/services/state.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStateComponent } from '../components/add-state/add-state.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit , OnDestroy
{
    rows: any[];
    // Private
    private _unsubscribeAll: Subject<any>;
    loadingIndicator=true;
    dialogRef: MatDialogRef<AddStateComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _matDialog: MatDialog, private _serv: StateService, private alertService:AlertService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    
    ngOnInit(): void
    {
        this.getStates();
    }

    getStates(){
        this._serv.get().subscribe(response => {
            this.loadingIndicator=false;
            this.rows = response as any[];
        })
    }

    updateState(data=null){
        this.dialogRef = this._matDialog.open(AddStateComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%",
            data: data
        });

        
        this.dialogRef.afterClosed().subscribe(result=>{
            if(result == 'updated'){
                this.getStates();
            }
        })
    }

    deleteState(row){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._serv.delete(row.id).subscribe(response=> {
                    this.alertService.openAletPanel("State deleted successfully",'','success');
                    this.getStates();
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
