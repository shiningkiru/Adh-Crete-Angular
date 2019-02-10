import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from './../../../../../shared/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  constructor(private fb: FormBuilder, 
            private alertService: AlertService,
            @Inject(MAT_DIALOG_DATA) public injectData: Contact, 
            public dialogRef: MatDialogRef<UpdateContactComponent>) { }

  ngOnInit() {
  }

}


