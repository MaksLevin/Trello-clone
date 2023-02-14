import { Injectable } from '@angular/core';

import { fireAuthErrors } from '@app/core/constants';
import { SnackBarService } from '@app/core/services';

@Injectable({
  providedIn: 'root',
})
export class FireAuthErrorService {
  constructor(private snackBarService: SnackBarService) {}

  showFireAuthErrors(e: any): void {
    const index = fireAuthErrors.findIndex((x) => x.code === e.code);

    if (index !== -1) {
      const err = fireAuthErrors[index];
      this.snackBarService.openSnackBar(err.message, 'close');
    } else {
      this.snackBarService.openSnackBar(fireAuthErrors[0].message, 'close');
    }
  }
}
