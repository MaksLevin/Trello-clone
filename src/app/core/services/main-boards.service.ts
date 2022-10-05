import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';
import { Observable } from 'rxjs';

import { IMainBoard } from '../models/mainBoard';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  constructor(private db: DatabaseService) {}

  async createNewMainBoards(
    mainBoard: IMainBoard,
    pathId: string
  ): Promise<void> {
    this.db.setCollection('mainBoards', pathId, mainBoard);
  }

  getMainBoards(userAuthUid: string): Observable<any> {
    return this.db.getMainBoardsFromCollection(userAuthUid);
  }

  updateMainBoard(idBoard: string, field: string, newData: string) {
    this.db.updateMainBoard('mainBoards', idBoard, field, newData);
  }

  deleteMainBoard(idBoard: string) {
    this.db.deleteMainBoard('mainBoards', idBoard);
  }

  pushId(): string {
    return this.db.createId();
  }
}
