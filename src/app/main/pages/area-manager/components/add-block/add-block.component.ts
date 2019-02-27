import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Block } from 'app/shared/Models/block';
import { City } from 'app/shared/Models/city';
import { Observable } from 'rxjs';
import { BlockService } from 'app/shared/services/block.service';
import { CityService } from 'app/shared/services/city.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss']
})
export class AddBlockComponent implements OnInit {
  blockForm: FormGroup;
  formData: Block;
  blockData;
  selectedCity:City;
  cityList: City[];
  filteredCity: Observable<Object[]>;
  cityTyping=true;
  
  constructor(private fb: FormBuilder, 
            private _serv: BlockService,
            private cityService: CityService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: Block, 
            public dialogRef: MatDialogRef<AddBlockComponent>) {
              this.blockData = data;
              this.selectedCity = (data)?data.city:null;
              this.getCitys();
             }

  ngOnInit() {
    this.blockForm = this.fb.group({
      id: [(this.blockData)?this.blockData.id:null],
      cityId: [(this.blockData)?this.blockData.city.id:null],
      cityName: [(this.blockData)?this.blockData.city.cityName:"", [Validators.required]],
      blockName: [(this.blockData)?this.blockData.blockName:"", [Validators.required]]
    });

    
    this.filteredCity = this.blockForm.get('cityName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCity(value))
      );
  }

  
  
  private _filterCity(value: string): City[] {
    const filterValue = (value)?value.toLowerCase():"";
    if(!this.cityList)return;
    return this.cityList.filter(option => {
      return option.cityName.toLowerCase().includes(filterValue)
    });
  }

  onSelectCity(event, city) {
    if(event.isUserInput){
      this.selectedCity = city;
      this.blockForm.get('cityId').setValue(city.id);
    }
  }

  checkCity() {
    if(this.cityTyping){
      this.cityTyping=false;
      return;
    }
    if(!this.selectedCity || this.blockForm.get('cityName').value != this.selectedCity.cityName){
      this.blockForm.get('cityName').setValue(null);
      this.blockForm.get('cityId').setValue(null);
    }
  }

  getCitys() {
    this.cityService.get().subscribe(response => {
      this.cityList = response as City[];
    })
  }

  updateBlock(){
    this.cityTyping=false;
    this.checkCity();
    this.formService.markFormGroupTouched(this.blockForm);
    if(this.blockForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.blockForm.value)).subscribe(response => {
      this.alertService.openAletPanel("Block updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


