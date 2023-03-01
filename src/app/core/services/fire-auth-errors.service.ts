import { Injectable } from '@angular/core';

import { fireAuthErrors } from '@app/core/constants';
import { SnackBarService } from '@app/core/services';

@Injectable({
  providedIn: 'root',
})
export class FireAuthErrorService {
  constructor(private snackBarService: SnackBarService) {}

  showFireAuthErrors(error: any): void {
    const index = fireAuthErrors.findIndex((x) => x.code === error.code);
    const currentError = fireAuthErrors[index];
    index !== -1
      ? this.snackBarService.openSnackBar(currentError.message, 'close')
      : this.snackBarService.openSnackBar(fireAuthErrors[0].message, 'close');
  }
}
