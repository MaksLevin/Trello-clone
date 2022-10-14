import { Injectable } from '@angular/core';
import { FirestoreService } from '@app/core/services';
import { Observable } from 'rxjs';

import { MainBoard } from '../models/mainBoard.model';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  constructor(private firestoreService: FirestoreService) {}

  createNewMainBoards(mainBoard: MainBoard, pathId: string): Promise<void> {
    return this.firestoreService.setCollection('mainBoards', pathId, mainBoard);
  }

  getMainBoards(userAuthUid: string): Observable<MainBoard[]> {
    return this.firestoreService.getMainBoardsFromCollection(userAuthUid);
  }

  updateMainBoardTitle(boardId: string, titleValue: string | undefined): Promise<void> {
    return this.firestoreService.updateMainBoardTitle('mainBoards', boardId, 'title', titleValue);
  }

  updateMainBoardDescription(boardId: string, descriptionValue: string | undefined): Promise<void> {
    return this.firestoreService.updateMainBoardDescription(
      'mainBoards',
      boardId,
      'description',
      descriptionValue
    );
  }

  deleteMainBoard(idBoard: string): Promise<void> {
    return this.firestoreService.deleteMainBoard('mainBoards', idBoard);
  }

  getPushId(): string {
    return this.firestoreService.createId();
  }
}
