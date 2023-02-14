import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FirestoreService, SnackBarService } from '@app/core/services';
import { fileTypes, fileTypesRegex, fileTypesError } from '@app/core/constants';
import * as authActions from '@app/store/user-auth/user-auth.action';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private firestoreService: FirestoreService,
    private snackBarService: SnackBarService,
    private store: Store
  ) {}

  onImageLoad(event: any, userId: string): void {
    const imgFile = event.target.files[0];
    const imgFileName = imgFile.name.toLowerCase();

    const matches = fileTypes.some((it) => {
      return imgFileName.endsWith(it);
    });

    if (!fileTypesRegex.test(imgFileName)) {
      this.snackBarService.openSnackBar(fileTypesError, 'close');
    }

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.firestoreService.updateDocumentField(
          'users/',
          userId,
          'profilePhoto',
          reader.result!.toString()
        );

        this.store.dispatch(
          authActions.updateProfilePhoto({ profilePhoto: reader.result!.toString() })
        );
      });

      reader.readAsDataURL(imgFile);
    }
  }
}
