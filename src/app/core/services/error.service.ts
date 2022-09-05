import { Injectable } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Errors } from '@app/core/const/validation-errors';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  showError(e: any): void {
    console.log(e);
    const index = Errors.findIndex((x) => x.code === e.code);

    if (index !== -1) {
      const err = Errors[index];
      this.openSnackBar(err.message, 'close');
    } else {
      this.openSnackBar(
        `Oops, something went wrong!<br>We couldn's complete your request at this time. Please try again later`,
        'close'
      );
    }
  }
}
