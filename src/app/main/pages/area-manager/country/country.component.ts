import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCountryComponent } from './../components/add-country/add-country.component';
import { CountryService } from './../../../../shared/services/country.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

    rows: any[];
    // Private
    private _unsubscribeAll: Subject<any>;
    loadingIndicator=true;
    dialogRef: MatDialogRef<AddCountryComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _matDialog: MatDialog, private _serv: CountryService, private alertService:AlertService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.getCountries();
    }

    getCountries(){
        this._serv.get().subscribe(response => {
            this.loadingIndicator=false;
            this.rows = response as any[];
        })
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

    updateCountry(data=null){
        this.dialogRef = this._matDialog.open(AddCountryComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%",
            data: data
        });

        
        this.dialogRef.afterClosed().subscribe(result=>{
            if(result == 'updated'){
                this.getCountries();
            }
        })
    }

    deleteCountry(row){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._serv.delete(row.id).subscribe(response=> {
                    this.alertService.openAletPanel("Country deleted successfully",'','success');
                    this.getCountries();
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
