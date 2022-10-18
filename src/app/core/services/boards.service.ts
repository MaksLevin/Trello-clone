import { Injectable } from '@angular/core';
import { FirestoreService } from '@app/core/services';
import { Observable } from 'rxjs';
import { List } from '../models/listModel';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private firestoreService: FirestoreService) {}

  createNewList(list: List, pathId: string): Promise<void> {
    return this.firestoreService.setCollection('lists', pathId, list);
  }

  getLists(mainBoardId: string): Observable<List[]> {
    return this.firestoreService.getFromCollectionByProperty('lists', 'mainBoardId', mainBoardId);
  }

  updateListTitle(listId: string, titleValue: string | undefined): Promise<void> {
    return this.firestoreService.updateDocumentField('lists', listId, 'title', titleValue);
  }

  deleteList(listId: string): Promise<void> {
    return this.firestoreService.deleteDocument('lists', listId);
  }

  getPushId(): string {
    return this.firestoreService.createId();
  }
}
