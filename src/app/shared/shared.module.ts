import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
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
        MatSnackBarModule,

        NgxDatatableModule,
  ]
})
export class SharedModule { }
