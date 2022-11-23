import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogModel } from '../models';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  enterAnimationDuration = '300ms';
  exitAnimationDuration = '150ms';

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog<T>(configuration: DialogModel<T>): Observable<boolean> {
    return this.dialog
      .open(configuration.typeDialog, {
        enterAnimationDuration: configuration.enterAnimationDuration || this.enterAnimationDuration,
        exitAnimationDuration: configuration.exitAnimationDuration || this.exitAnimationDuration,
        data: {
          message: configuration.message,
        },
      })
      .afterClosed()
      .pipe(take(1));
  }
}
