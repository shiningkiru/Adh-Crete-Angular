import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatAutocompleteModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FuseConfirmDialogModule } from '@fuse/components';

@NgModule({
  declarations: [],
  imports: [
        CommonModule,
        TranslateModule,
        FuseSharedModule,

        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatSnackBarModule,

        NgxDatatableModule,
  ],
  exports: [

        TranslateModule,
        FuseSharedModule,
        FuseConfirmDialogModule,

        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatSnackBarModule,
        MatAutocompleteModule,

        NgxDatatableModule,
  ],
  providers: [  
  ]
})
export class SharedModule { }
