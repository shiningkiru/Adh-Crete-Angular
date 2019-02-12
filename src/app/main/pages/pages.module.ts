import { NgModule } from '@angular/core';

import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';
import { SearchClassicModule } from 'app/main/pages/search/classic/search-classic.module';
import { SearchModernModule } from 'app/main/pages/search/modern/search-modern.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AreaManagerModule } from './area-manager/area-manager.module';
import { UserAccessModule } from './user-access/user-access.module';

@NgModule({
    imports: [
        DashboardModule,
        AreaManagerModule,
        UserAccessModule,

        // Errors
        Error404Module,
        Error500Module,

        // Profile
        ProfileModule,

        // Search
        SearchClassicModule,
        SearchModernModule,
    ]
})
export class PagesModule
{

}
