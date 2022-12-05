import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

import { HttpService } from '@app/core/services';
import { List } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private sourceLists = new BehaviorSubject<List[]>([]);

  lists = this.sourceLists.asObservable();

  constructor(private httpService: HttpService) {}

  async createNewList(list: List): Promise<void> {
    const result = this.lists.pipe(map((array) => array.concat(list)));

    this.sourceLists.next(await firstValueFrom(result));

    return this.httpService.setCollection('lists', list);
  }

  async getLists(mainBoardId: string): Promise<void> {
    const result = this.httpService.getFromCollectionByProperty(
      'lists',
      'mainBoardId',
      mainBoardId
    );

    this.sourceLists.next(await firstValueFrom(result as unknown as Observable<List[]>));
  }

  async updateListTitle(listId: string, titleValue: string | undefined): Promise<object> {
    const result = this.lists.pipe(
      map((array) =>
        array.map(function (element) {
          if (element.id === listId) {
            element.title = titleValue as string;
          }
          return element;
        })
      )
    );

    this.sourceLists.next(await firstValueFrom(result));

    return this.httpService.updateDocumentField('lists', listId, 'title', titleValue);
  }

  async deleteList(listId: string): Promise<object> {
    const result = this.lists.pipe(
      map((array) => array.filter((element) => element.id !== listId))
    );

    this.sourceLists.next(await firstValueFrom(result));

    return this.httpService.deleteDocument('lists', listId);
  }

  getPushId(): string {
    return this.httpService.createId();
  }
}
