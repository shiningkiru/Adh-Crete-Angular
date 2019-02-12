import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region } from 'app/shared/Models/region';
import { State } from 'app/shared/Models/state';
import { Observable } from 'rxjs';
import { RegionService } from 'app/shared/services/region.service';
import { StateService } from 'app/shared/services/state.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {
  private regionForm: FormGroup;
  private formData: Region;
  private regionData;
  selectedState:State;
  stateList: State[];
  filteredState: Observable<Object[]>;
  stateTyping=false;
  
  constructor(private fb: FormBuilder, 
            private _serv: RegionService,
            private stateService: StateService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: Region, 
            public dialogRef: MatDialogRef<AddRegionComponent>) {
              this.regionData = data;
              this.selectedState = (data)?data.state:null;
              this.getCountries();
             }

  ngOnInit() {
    this.regionForm = this.fb.group({
      id: [(this.regionData)?this.regionData.id:null],
      stateId: [(this.regionData)?this.regionData.state.id:null],
      stateName: [(this.regionData)?this.regionData.state.stateName:"", [Validators.required]],
      regionName: [(this.regionData)?this.regionData.regionName:"", [Validators.required]]
    });

    
    this.filteredState = this.regionForm.get('stateName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterState(value))
      );
  }

  
  
  private _filterState(value: string): State[] {
    const filterValue = (value)?value.toLowerCase():"";
    if(!this.stateList)return;
    return this.stateList.filter(option => {
      return option.stateName.toLowerCase().includes(filterValue)
    });
  }

  onSelectState(event, state) {
    if(event.isUserInput){
      this.selectedState = state;
      this.regionForm.get('stateId').setValue(state.id);
    }
  }

  checkState() {
    if(this.stateTyping){
      this.stateTyping=false;
      return;
    }
    if(!this.selectedState || this.regionForm.get('stateName').value != this.selectedState.stateName){
      this.regionForm.get('stateName').setValue(null);
      this.regionForm.get('stateId').setValue(null);
    }
  }

  getCountries() {
    this.stateService.get().subscribe(response => {
      this.stateList = response as State[];
    })
  }

  updateRegion(){
    this.stateTyping=false;
    this.checkState();
    this.formService.markFormGroupTouched(this.regionForm);
    if(this.regionForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.regionForm.value)).subscribe(response => {
      this.alertService.openAletPanel("Region updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


