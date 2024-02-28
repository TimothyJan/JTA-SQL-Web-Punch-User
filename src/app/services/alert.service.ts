import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, "X", {
      duration: 5000
    });
  }
}
