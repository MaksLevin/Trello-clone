import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';
import { Observable } from 'rxjs';

import { IMainBoard } from '../models/mainBoard';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  constructor(private databaseService: DatabaseService) {}

  createNewMainBoards(mainBoard: IMainBoard, pathId: string): Promise<void> {
    return this.databaseService.setCollection('mainBoards', pathId, mainBoard);
  }

  getMainBoards(userAuthUid: string): Observable<IMainBoard[]> {
    return this.databaseService.getMainBoardsFromCollection(userAuthUid);
  }

  updateMainBoard(idBoard: string, title: string, description: string | undefined): Promise<void> {
    return this.databaseService.updateMainBoard('mainBoards', idBoard, title, description);
  }

  deleteMainBoard(idBoard: string): Promise<void> {
    return this.databaseService.deleteMainBoard('mainBoards', idBoard);
  }

  pushId(): string {
    return this.databaseService.createId();
  }
}
