import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './designation/designation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddDesignationComponent } from './components/add-designation/add-designation.component';
import { UpdatePermissionComponent } from './components/update-permission/update-permission.component';
import { AccessPrevilegeComponent } from './access-previlege/access-previlege.component';

const routes = [
  {
      path        : 'admin/user-access/designation',
      component   : DesignationComponent
  },
  {
    path        : 'admin/user-access/permissions',
    component   : AccessPrevilegeComponent
}
];

@NgModule({
  declarations: [DesignationComponent, AddDesignationComponent, UpdatePermissionComponent, AccessPrevilegeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [AddDesignationComponent, UpdatePermissionComponent]
})
export class UserAccessModule { }
