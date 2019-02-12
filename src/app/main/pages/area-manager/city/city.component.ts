import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddCityComponent } from '../components/add-city/add-city.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { CityService } from 'app/shared/services/city.service';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, OnDestroy {

    rows: any[];
    // Private
    private _unsubscribeAll: Subject<any>;
    loadingIndicator=true;
    dialogRef: MatDialogRef<AddCityComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _matDialog: MatDialog, private _serv: CityService, private alertService:AlertService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    
    ngOnInit(): void
    {
        this.getCities();
    }

    getCities(){
        this._serv.get().subscribe(response => {
            this.loadingIndicator=false;
            this.rows = response as any[];
        })
    }

    updateCity(data=null){
        this.dialogRef = this._matDialog.open(AddCityComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%",
            data: data
        });

        
        this.dialogRef.afterClosed().subscribe(result=>{
            if(result == 'updated'){
                this.getCities();
            }
        })
    }

    deleteCity(row){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._serv.delete(row.id).subscribe(response=> {
                    this.alertService.openAletPanel("City deleted successfully",'','success');
                    this.getCities();
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
