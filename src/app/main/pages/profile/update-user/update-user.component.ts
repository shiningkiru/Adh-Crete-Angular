import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { FormService } from 'app/shared/services/form.service';
import { User } from 'app/shared/Models/user';
import { Store } from '@ngrx/store';
import { AlertService } from 'app/shared/services/alert.service';
import { DesignationService } from 'app/shared/services/designation.service';
import { Designation } from 'app/shared/Models/designation';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updatingUserId=null;
  userForm:FormGroup;
  userData:User;
  fullAccess=false;
  isAdmin=false;
  loggedAdmin=false;
  designationList: Designation[];

  constructor(private router: Router, 
              private _auth: AuthService, 
              private activatedRoute:ActivatedRoute, 
              private fb: FormBuilder, 
              private alertService: AlertService, 
              private _serv: UserService, 
              private formService: FormService,
              private designationServ: DesignationService,
              private zone: NgZone) {
    
    this.updatingUserId=this.activatedRoute.snapshot.params.id;
    this.loggedAdmin = this._auth.currentUser.isAdmin;
    if(this.router.url == '/admin/new-admin'){
      this.isAdmin=true;
    }

    if(this.updatingUserId != this._auth.currentUser.userId && this.loggedAdmin)this.fullAccess=true;
    
    
    this.getAllDesignation();
   }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.updatingUserId],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
      isAdmin: [this.isAdmin, [Validators.required]],
      profilePic: [''],
      password: [''],
      designationId: [''],
      fatherName: [''],
      motherName: [''],
      dateOfBirth: [''],
      dateOfJoin: [''],
      currentSalary: ['0'],
      presentAddress: [''],
      permanentAddress: [''],
      drivingLicence: [''],
      panNumber: [''],
      adharNumber: [''],
      passportNumber: [''],
      maritalStatus: ['married'],
    });
    
    if(this.updatingUserId){
      this.getUserDetails();
    }else {
      this.userForm.get('password').setValidators(Validators.required);
      this.syncFormValidations();
    }

  }

  getUserDetails() {
    this._serv.getBy(this.updatingUserId).subscribe(response => {
      this.userData = response as User;
      this.isAdmin = this.userData.isAdmin;
      this.userForm.patchValue(this.userData);
      this.userForm.get('profilePic').setValue(null);
      this.syncFormValidations();
    })
  }

  getAllDesignation(){
    this.designationServ.get().subscribe(response => {
      this.designationList = response as Designation[];
    })
  }

  syncFormValidations(){
    if(!this.isAdmin && this.fullAccess) {
      this.zone.run(() => {
        this.userForm.get('designationId').setValidators([Validators.required]);
        this.userForm.get('designationId').updateValueAndValidity();
        this.userForm.get('dateOfBirth').setValidators([Validators.required]);
        this.userForm.get('dateOfBirth').updateValueAndValidity();
        this.userForm.get('dateOfJoin').setValidators([Validators.required]);
        this.userForm.get('dateOfJoin').updateValueAndValidity();
      });
    }
  }

  updateUser() {
    this.userForm.get('isAdmin').setValue(this.isAdmin);
    this.formService.markFormGroupTouched(this.userForm); 
    if(this.userForm.invalid)return;
    let formData = this.userForm.value;
    formData.isAdmin = (formData.isAdmin)?"true":"false";
    formData.isActive = (formData.isActive)?"true":"false";
    formData.dateOfBirth = this._serv.formatDate(formData.dateOfBirth);
    formData.dateOfJoin = this._serv.formatDate(formData.dateOfJoin);
    this._serv.create(this._serv.createFormData(formData)).subscribe(response => {
      this.alertService.openAletPanel("Profile updated successfully", '', 'success');
      if(this.updatingUserId == this._auth.currentUser.userId)this._auth.getLoggedInUser();
      this.updatingUserId = response['data']['id'];
      this.router.navigate(['/admin/profile/'+this.updatingUserId]);
    })
  }
 
  fileSelected(data) {
    this.userForm.get('profilePic').setValue(data);    
  }

}
