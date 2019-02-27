import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StateService } from 'app/shared/services/state.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { State } from 'app/shared/Models/state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CountryService } from 'app/shared/services/country.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Country } from 'app/shared/Models/country';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {
  stateForm: FormGroup;
  formData: State;
  stateData;
  selectedCountry:Country;
  countryList: Country[];
  filteredCountry: Observable<Object[]>;
  countryTyping=false;
  
  constructor(private fb: FormBuilder, 
            private _serv: StateService,
            private countryService: CountryService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: State, 
            public dialogRef: MatDialogRef<AddStateComponent>) {
              this.stateData = data;
              this.selectedCountry = (data)?data.country:null;
              this.getCountries();
             }

  ngOnInit() {
    this.stateForm = this.fb.group({
      id: [(this.stateData)?this.stateData.id:null],
      countryId: [(this.stateData)?this.stateData.country.id:null],
      countryName: [(this.stateData)?this.stateData.country.countryName:"", [Validators.required]],
      stateName: [(this.stateData)?this.stateData.stateName:"", [Validators.required]]
    });

    
    this.filteredCountry = this.stateForm.get('countryName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCountry(value))
      );
  }

  
  
  private _filterCountry(value: string): Country[] {
    const filterValue = (value)?value.toLowerCase():"";
    if(!this.countryList)return;
    return this.countryList.filter(option => {
      return option.countryName.toLowerCase().includes(filterValue)
    });
  }

  onSelectCountry(event, country) {
    if(event.isUserInput){
      this.selectedCountry = country;
      this.stateForm.get('countryId').setValue(country.id);
    }
  }

  checkCountry() {
    if(this.countryTyping){
      this.countryTyping=false;
      return;
    }
    if(!this.selectedCountry || this.stateForm.get('countryName').value != this.selectedCountry.countryName){
      this.stateForm.get('countryName').setValue(null);
      this.stateForm.get('countryId').setValue(null);
    }
  }

  getCountries() {
    this.countryService.get().subscribe(response => {
      this.countryList = response as Country[];
    })
  }

  updateState(){
    this.countryTyping=false;
    this.checkCountry();
    this.formService.markFormGroupTouched(this.stateForm);
    if(this.stateForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.stateForm.value)).subscribe(response => {
      this.alertService.openAletPanel("State updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


