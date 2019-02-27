import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { WorkAreaComponent } from './tabs/work-area/work-area.component';


const routes = [
    {
        path     : 'admin/profile',
        component: ProfileComponent
    },
    {
        path     : 'admin/profile/edit',
        component: UpdateUserComponent
    },
    {
        path     : 'admin/profile/:id',
        component: ProfileComponent
    },
    {
        path     : 'admin/profile/edit/:id',
        component: UpdateUserComponent
    },
    {
        path     : 'admin/new-admin',
        component: UpdateUserComponent
    },
    {
        path     : 'admin/all-admins',
        component: AllUsersComponent
    },
    {
        path     : 'admin/all-staffs',
        component: AllUsersComponent
    },
    {
        path     : 'admin/new-staff',
        component: UpdateUserComponent
    },
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        UpdateUserComponent,
        AllUsersComponent,
        WorkAreaComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ProfileModule
{
}
