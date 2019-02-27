import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../../../../../shared/services/alert.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Country } from 'app/shared/Models/country';
import { CountryService } from 'app/shared/services/country.service';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  countryForm: FormGroup;
  formData: Country;
  countryData;
  
  constructor(private fb: FormBuilder, 
            private _serv: CountryService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: Country, 
            public dialogRef: MatDialogRef<AddCountryComponent>) {
              this.countryData = data;
             }

  ngOnInit() {
    this.countryForm = this.fb.group({
      id: [(this.countryData)?this.countryData.id:null],
      countryName: [(this.countryData)?this.countryData.countryName:"", [Validators.required]],
      countryCode: [(this.countryData)?this.countryData.countryCode:"", [Validators.required]]
    })
  }

  updateCountry(){
    this.formService.markFormGroupTouched(this.countryForm);
    if(this.countryForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.countryForm.value)).subscribe(response => {
      this.alertService.openAletPanel("Country updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


