import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCountryComponent } from './../components/add-country/add-country.component';

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

    constructor(private _matDialog: MatDialog) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
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
