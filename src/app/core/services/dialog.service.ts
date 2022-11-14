import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirestoreService } from '@app/core/services';
import { DialogModalComponent } from '@app/shared';

import { deleteMessage } from '@app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private firestoreService: FirestoreService, private dialog: MatDialog) {}

  openConfirmationDialog(
    collection: string,
    elementId: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog
      .open(DialogModalComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          message: deleteMessage,
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          return this.firestoreService.deleteDocument(collection, elementId);
        }
        return;
      });
  }
}
