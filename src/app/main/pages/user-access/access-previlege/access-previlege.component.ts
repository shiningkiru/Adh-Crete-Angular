import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UpdatePermissionComponent } from '../components/update-permission/update-permission.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AccessPrevilegeService } from 'app/shared/services/access-previlege.service';
import { AlertService } from 'app/shared/services/alert.service';
import { DesignationService } from 'app/shared/services/designation.service';
import { Designation } from 'app/shared/Models/designation';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Previlege } from 'app/shared/Models/previlege';

@Component({
  selector: 'app-access-previlege',
  templateUrl: './access-previlege.component.html',
  styleUrls: ['./access-previlege.component.scss']
})
export class AccessPrevilegeComponent implements OnInit, OnDestroy {

  rows: Previlege[];
  // Private
  private _unsubscribeAll: Subject<any>;
  loadingIndicator=true;
  dialogRef: MatDialogRef<UpdatePermissionComponent>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  designationList: Designation[];
  selectedDesignation:Designation;
  designation= new FormControl('', [Validators.required]); 
  filteredDesignation: Observable<Object[]>;
  designationTyping=false;

  constructor(private _matDialog: MatDialog, private _serv: AccessPrevilegeService, private designationService: DesignationService, private alertService:AlertService) {
      this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
      this.getDesignations();

    
      this.filteredDesignation = this.designation.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterDesignation(value))
        );
  }

  
  
  private _filterDesignation(value: string): Designation[] {
    const filterValue = (value)?value.toLowerCase():"";
    if(!this.designationList)return;
    return this.designationList.filter(option => {
      return option.designationTitle.toLowerCase().includes(filterValue)
    });
  }

  onSelectDesignation(event, designation) {
    if(event.isUserInput){
      this.selectedDesignation = designation;
    }
  }

  checkDesignation() {
    if(this.designationTyping){
      this.designationTyping=false;
      return;
    }
    if(!this.selectedDesignation || this.designation.value != this.selectedDesignation.designationTitle){
        this.designation.setValue(null);
        this.selectedDesignation=null;
    }
  }

  getPrevileges(){
    this.designationTyping=false;
    this.checkDesignation();
    
    if(this.designation.valid && this.selectedDesignation) {
        this.loadingIndicator=true;
    this.getAccessPrevileges();
    }
  }

  getDesignations(){
    this.designationService.get().subscribe(response => {
        this.designationList = response as Designation[];
    })
  }

  getAccessPrevileges(){
    this._serv.getBy(this.selectedDesignation.id).subscribe(response => {
        this.rows = response as Previlege[];
        this.loadingIndicator=false;
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

  updateCountry(data=null){
      this.dialogRef = this._matDialog.open(UpdatePermissionComponent, {
          disableClose: false,
          minWidth: "320px",
          width: "450px",
          maxWidth: "100%",
          data: data
      });

      
      this.dialogRef.afterClosed().subscribe(result=>{
          if(result == 'updated'){
              this.getAccessPrevileges();
          }
      })
  }
}
