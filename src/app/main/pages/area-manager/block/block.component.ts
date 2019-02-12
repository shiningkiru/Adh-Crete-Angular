import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AddBlockComponent } from '../components/add-block/add-block.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BlockService } from 'app/shared/services/block.service';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit, OnDestroy {

    rows: any[];
    // Private
    private _unsubscribeAll: Subject<any>;
    loadingIndicator=true;
    dialogRef: MatDialogRef<AddBlockComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _matDialog: MatDialog, private _serv: BlockService, private alertService:AlertService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    
    ngOnInit(): void
    {
        this.getBlocks();
    }

    getBlocks(){
        this._serv.get().subscribe(response => {
            this.loadingIndicator=false;
            this.rows = response as any[];
        })
    }

    updateBlock(data=null){
        this.dialogRef = this._matDialog.open(AddBlockComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%",
            data: data
        });

        
        this.dialogRef.afterClosed().subscribe(result=>{
            if(result == 'updated'){
                this.getBlocks();
            }
        })
    }

    deleteBlock(row){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._serv.delete(row.id).subscribe(response=> {
                    this.alertService.openAletPanel("Block deleted successfully",'','success');
                    this.getBlocks();
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
