import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

import { HttpService } from '@app/core/services';
import { List } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private sourceLists = new BehaviorSubject<List[]>([]);

  lists$ = this.sourceLists.asObservable();

  listsId!: string[];

  constructor(private httpService: HttpService) {}

  async createNewList(list: List): Promise<void> {
    const newLists = this.lists$.pipe(map((lists) => lists.concat(list)));
    const result = await firstValueFrom(newLists);

    this.sourceLists.next(result);

    this.getListsId(result);

    this.httpService.setCollection('lists', list);
  }

  async getLists(mainBoardId: string): Promise<void> {
    const lists = this.httpService.getFromCollectionByProperty('lists', 'mainBoardId', mainBoardId);
    const result = await firstValueFrom(lists as Observable<List[]>);

    this.sourceLists.next(result);

    this.getListsId(result);
  }

  getListsId(lists: List[]): void {
    this.listsId = lists.map((list) => list.id);
  }

  async updateListTitle(listId: string, titleValue: string | undefined): Promise<void> {
    const updatedLists = this.lists$.pipe(
      map((lists) =>
        lists.map((list) => {
          if (list.id === listId) {
            list.title = titleValue as string;
          }
          return list;
        })
      )
    );
    const result = await firstValueFrom(updatedLists);

    this.sourceLists.next(result);

    this.httpService.updateDocumentField('lists', listId, 'title', titleValue);
  }

  async deleteList(listId: string): Promise<void> {
    const newLists = this.lists$.pipe(map((lists) => lists.filter((list) => list.id !== listId)));
    const result = await firstValueFrom(newLists);

    this.sourceLists.next(result);

    this.httpService.deleteDocument('lists', listId);
  }

  getPushId(): string {
    return this.httpService.createId();
  }
}
