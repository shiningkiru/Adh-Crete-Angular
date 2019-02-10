import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatCheckboxModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [
        CommonModule,
        TranslateModule,
        FuseSharedModule,

        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,

        NgxDatatableModule,
  ],
  exports: [

        TranslateModule,
        FuseSharedModule,

        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,

        NgxDatatableModule,
  ]
})
export class SharedModule { }
