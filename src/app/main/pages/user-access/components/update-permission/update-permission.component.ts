import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Previlege } from 'app/shared/Models/previlege';
import { AccessPrevilegeService } from 'app/shared/services/access-previlege.service';
import { FormService } from 'app/shared/services/form.service';
import { AlertService } from 'app/shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.scss']
})
export class UpdatePermissionComponent implements OnInit {
  private permissionForm: FormGroup;
  private formData: Previlege;
  private permissionData;
  
  constructor(private fb: FormBuilder, 
            private _serv: AccessPrevilegeService,
            private formService: FormService,
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public data: Previlege, 
            public dialogRef: MatDialogRef<UpdatePermissionComponent>) {
              this.permissionData = data;
             }

  ngOnInit() {
    this.permissionForm = this.fb.group({
      id: [(this.permissionData)?this.permissionData.id:null],
      moduleName: [(this.permissionData)?this.permissionData.moduleName:""],
      designationTitle: [(this.permissionData)?this.permissionData.designation.designationTitle:""],
      permission: [(this.permissionData)?this.permissionData.permission:"", [Validators.required]]
    })
  }

  updateCountry(){
    this.formService.markFormGroupTouched(this.permissionForm);
    if(this.permissionForm.invalid)return;
    this._serv.create(this._serv.createFormData(this.permissionForm.value)).subscribe(response => {
      this.alertService.openAletPanel("Permission updated successfully!", '', 'success');
      this.dialogRef.close('updated');
    })
  }


}


