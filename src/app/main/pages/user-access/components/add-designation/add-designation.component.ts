import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Designation } from 'app/shared/Models/designation';
import { DesignationService } from 'app/shared/services/designation.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent implements OnInit {

  private designationForm: FormGroup;
  private formData: Designation;
  private designationData;

  constructor(private fb: FormBuilder, 
            private _serv: DesignationService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: Designation, 
            public dialogRef: MatDialogRef<AddDesignationComponent>) {
              this.designationData = data;
            }

  ngOnInit() {
    this.designationForm = this.fb.group({
      id: [(this.designationData)?this.designationData.id:null],
      designationTitle: [(this.designationData)?this.designationData.designationTitle:null],
      targetArea: [(this.designationData)?this.designationData.targetArea:null]
    });
  }

  updateDesignation(){
    this.formService.markFormGroupTouched(this.designationForm);
    if(this.designationForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.designationForm.value)).subscribe(response => {
      this.alertService.openAletPanel("Designation updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


