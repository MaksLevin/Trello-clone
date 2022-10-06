import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';
import { Observable } from 'rxjs';

import { IMainBoard } from '../models/mainBoard';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  constructor(private db: DatabaseService) {}

  createNewMainBoards(mainBoard: IMainBoard, pathId: string): void {
    this.db.setCollection('mainBoards', pathId, mainBoard);
  }

  getMainBoards(userAuthUid: string): Observable<IMainBoard[]> {
    return this.db.getMainBoardsFromCollection(userAuthUid);
  }

  updateMainBoard(idBoard: string, title: string, description: string): void {
    this.db.updateMainBoard('mainBoards', idBoard, title, description);
  }

  deleteMainBoard(idBoard: string): void {
    this.db.deleteMainBoard('mainBoards', idBoard);
  }

  pushId(): string {
    return this.db.createId();
  }
}
