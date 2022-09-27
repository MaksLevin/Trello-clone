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
    return this.db.getMainBoardFromCollection(userAuthUid);
  }

  pushId(): string {
    return this.db.createId();
  }
}
