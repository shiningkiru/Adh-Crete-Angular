import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City } from 'app/shared/Models/city';
import { Region } from 'app/shared/Models/region';
import { Observable } from 'rxjs';
import { CityService } from 'app/shared/services/city.service';
import { RegionService } from 'app/shared/services/region.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
  private cityForm: FormGroup;
  private formData: City;
  private cityData;
  selectedRegion:Region;
  regionList: Region[];
  filteredRegion: Observable<Object[]>;
  regionTyping=true;
  
  constructor(private fb: FormBuilder, 
            private _serv: CityService,
            private regionService: RegionService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: City, 
            public dialogRef: MatDialogRef<AddCityComponent>) {
              this.cityData = data;
              this.selectedRegion = (data)?data.region:null;
              this.getRegions();
             }

  ngOnInit() {
    this.cityForm = this.fb.group({
      id: [(this.cityData)?this.cityData.id:null],
      regionId: [(this.cityData)?this.cityData.region.id:null],
      regionName: [(this.cityData)?this.cityData.region.regionName:"", [Validators.required]],
      cityName: [(this.cityData)?this.cityData.cityName:"", [Validators.required]]
    });

    
    this.filteredRegion = this.cityForm.get('regionName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterRegion(value))
      );
  }

  
  
  private _filterRegion(value: string): Region[] {
    const filterValue = (value)?value.toLowerCase():"";
    if(!this.regionList)return;
    return this.regionList.filter(option => {
      return option.regionName.toLowerCase().includes(filterValue)
    });
  }

  onSelectRegion(event, region) {
    if(event.isUserInput){
      this.selectedRegion = region;
      this.cityForm.get('regionId').setValue(region.id);
    }
  }

  checkRegion() {
    if(this.regionTyping){
      this.regionTyping=false;
      return;
    }
    if(!this.selectedRegion || this.cityForm.get('regionName').value != this.selectedRegion.regionName){
      this.cityForm.get('regionName').setValue(null);
      this.cityForm.get('regionId').setValue(null);
    }
  }

  getRegions() {
    this.regionService.get().subscribe(response => {
      this.regionList = response as Region[];
    })
  }

  updateCity(){
    this.regionTyping=false;
    this.checkRegion();
    this.formService.markFormGroupTouched(this.cityForm);
    if(this.cityForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.cityForm.value)).subscribe(response => {
      this.alertService.openAletPanel("City updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


