import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material/snack-bar';

@Injectable()
export class ToastrService {
  constructor(private snackBar: MatSnackBar) {}

  open(msg:string, config?:MatSnackBarConfig ,action?:string) {
    this.snackBar.open(msg, action, config)
  }
  success(msg:string, config?:MatSnackBarConfig ,action?:string) {
    this.snackBar.open(msg, action, { panelClass:'success', ...config })
  }
  error(msg:string, config?:MatSnackBarConfig ,action?:string) {
    this.snackBar.open(msg, action, { panelClass:'error', ...config })
  }
  info(msg:string, config?:MatSnackBarConfig ,action?:string) {
    this.snackBar.open(msg, action, { panelClass:'info', ...config })
  }
  warn(msg:string, config?:MatSnackBarConfig ,action?:string) {
    this.snackBar.open(msg, action, { panelClass:'warning', ...config })
  }
}
