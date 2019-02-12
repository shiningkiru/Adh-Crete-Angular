import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './designation/designation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddDesignationComponent } from './components/add-designation/add-designation.component';

const routes = [
  {
      path        : 'admin/user-access/designation',
      component   : DesignationComponent
  }
];

@NgModule({
  declarations: [DesignationComponent, AddDesignationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [AddDesignationComponent]
})
export class UserAccessModule { }
