import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { StateComponent } from './state/state.component';
import { RegionComponent } from './region/region.component';
import { CityComponent } from './city/city.component';
import { BlockComponent } from './block/block.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddStateComponent } from './components/add-state/add-state.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { AddRegionComponent } from './components/add-region/add-region.component';
import { AddBlockComponent } from './components/add-block/add-block.component';

const routes = [
    {
        path        : 'admin/country',
        component   : CountryComponent
    },
    {
        path        : 'admin/state',
        component   : StateComponent
    },
    {
        path        : 'admin/region',
        component   : RegionComponent
    },
    {
        path        : 'admin/city',
        component   : CityComponent
    },
    {
        path        : 'admin/block',
        component   : BlockComponent
    }
];

@NgModule({
  declarations: [CountryComponent, StateComponent, RegionComponent, CityComponent, BlockComponent, AddCountryComponent, AddStateComponent, AddCityComponent, AddRegionComponent, AddBlockComponent],
  imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
  ],
  entryComponents: [AddCountryComponent, AddStateComponent, AddRegionComponent, AddCityComponent, AddBlockComponent]
})
export class AreaManagerModule { }
