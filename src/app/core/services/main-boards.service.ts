import { Injectable } from '@angular/core';
import { FirestoreService } from '@app/core/services';
import { Observable } from 'rxjs';

import { MainBoard } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  constructor(private firestoreService: FirestoreService) {}

  createNewMainBoards(mainBoard: MainBoard, pathId: string): Promise<void> {
    return this.firestoreService.setCollection('mainBoards', pathId, mainBoard);
  }

  getMainBoards(userAuthUid: string): Observable<MainBoard[]> {
    return this.firestoreService.getFromCollectionByProperty('mainBoards', 'userUid', userAuthUid);
  }

  updateMainBoardTitle(boardId: string, titleValue: string | undefined): Promise<void> {
    return this.firestoreService.updateDocumentField('mainBoards', boardId, 'title', titleValue);
  }

  updateMainBoardDescription(boardId: string, descriptionValue: string | undefined): Promise<void> {
    return this.firestoreService.updateDocumentField(
      'mainBoards',
      boardId,
      'description',
      descriptionValue
    );
  }

  getPushId(): string {
    return this.firestoreService.createId();
  }
}
