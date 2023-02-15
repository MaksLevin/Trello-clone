import { Injectable } from '@angular/core';

import { FirestoreService, SnackBarService } from '@app/core/services';
import { fileTypes, fileTypesRegex, fileTypesError } from '@app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private firestoreService: FirestoreService,
    private snackBarService: SnackBarService
  ) {}

  onImageLoad(event: any, userId: string): string | undefined {
    const imgFile = event.target.files[0];
    const imgFileName = imgFile.name.toLowerCase();

    const matches = fileTypes.some((fileType) => {
      return imgFileName.endsWith(fileType);
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
        return reader.result!.toString();
      });

      reader.readAsDataURL(imgFile);
    }
    return;
  }
}
