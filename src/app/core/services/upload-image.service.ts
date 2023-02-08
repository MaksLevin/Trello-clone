import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { FirestoreService } from '@app/core/services';
import * as authSelectors from '@app/store/user-auth/user-auth.selector';
import { fileTypes } from '../constants';
import { AppStateStore } from '../models';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private store: Store<AppStateStore>,private firestoreService: FirestoreService) { }

  userId$ = this.store.select(authSelectors.selectGetUserAuthId);

  async onImageLoad(evt: any ): Promise<void> {
    const imgFile = evt.target.files[0];
    const imgFileName = imgFile.name.toLowerCase();
    const userId = await firstValueFrom(this.userId$)

    const matches = fileTypes.some((it) => {
      return imgFileName.endsWith(it);
    });

    if (!/\.(jpe?g|png)$/i.test(imgFileName)) {
      alert('Its not a picture, try again');
    }

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.firestoreService.updateDocumentField('users/', userId ,'profilePhoto',reader.result!.toString())

        console.log(reader.result!.toString())
      });

      reader.readAsDataURL(imgFile);
    }
  }
}
