import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatAutocompleteModule, MatCardModule, MatTabsModule, MatDividerModule, MatSlideToggleModule, MatDatepickerModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
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
        MatCardModule,
        MatTabsModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatDatepickerModule,

        NgxDatatableModule,

        FileUploadComponent,
  ],
  providers: [  
  ]
})
export class SharedModule { }
