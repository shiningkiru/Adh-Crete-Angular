import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddRegionComponent } from '../components/add-region/add-region.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { RegionService } from 'app/shared/services/region.service';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {

    rows: any[];
    // Private
    private _unsubscribeAll: Subject<any>;
    loadingIndicator=true;
    dialogRef: MatDialogRef<AddRegionComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _matDialog: MatDialog, private _serv: RegionService, private alertService:AlertService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    
    ngOnInit(): void
    {
        this.getRegions();
    }

    getRegions(){
        this._serv.get().subscribe(response => {
            this.loadingIndicator=false;
            this.rows = response as any[];
        })
    }

    updateRegion(data=null){
        this.dialogRef = this._matDialog.open(AddRegionComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%",
            data: data
        });

        
        this.dialogRef.afterClosed().subscribe(result=>{
            if(result == 'updated'){
                this.getRegions();
            }
        })
    }

    deleteRegion(row){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._serv.delete(row.id).subscribe(response=> {
                    this.alertService.openAletPanel("Region deleted successfully",'','success');
                    this.getRegions();
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
