import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { fireAuthErrors } from '@app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class FireAuthErrorService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  showFireAuthErrors(e: any): void {
    const index = fireAuthErrors.findIndex((x) => x.code === e.code);

    if (index !== -1) {
      const err = fireAuthErrors[index];
      this.openSnackBar(err.message, 'close');
    } else {
      this.openSnackBar(fireAuthErrors[0].message, 'close');
    }
  }
}
