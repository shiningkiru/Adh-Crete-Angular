import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCountryComponent } from './../components/add-country/add-country.component';
import { CountryService } from './../../../../shared/services/country.service';

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

    constructor(private _matDialog: MatDialog, private _serv: CountryService) {
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

    updateCountry(data?){
        this.dialogRef = this._matDialog.open(AddCountryComponent, {
            disableClose: false,
            minWidth: "320px",
            width: "450px",
            maxWidth: "100%"
        });
    }
}
