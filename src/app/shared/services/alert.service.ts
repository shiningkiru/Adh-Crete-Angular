import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  openAletPanel(message: string, action: string, type?) {
    let _class="";
    if(type=="success")
      _class="success-snack-bar";
    else
      _class="error-snack-bar";

    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [_class],
      verticalPosition:'top',
      horizontalPosition:'right'
    });
  }

  openErrorPanel(errorMsg){
    this.zone.run(() => {
      if(typeof errorMsg == "string")
        this.snackBar.open(errorMsg, "", {
          duration: 4000,
          panelClass: 'error-snack-bar',
          verticalPosition:'top',
          horizontalPosition:'right'
        });
      else
        for (let property in errorMsg){
            this.snackBar.open(errorMsg[property][0], "", {
              duration: 4000,
              panelClass: 'error-snack-bar',
              verticalPosition:'top',
              horizontalPosition:'right'
            });
        }
    });
      
  }
}
