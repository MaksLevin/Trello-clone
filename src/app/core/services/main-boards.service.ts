import { Injectable } from '@angular/core';
import { HttpService } from '@app/core/services';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

import { MainBoard } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  private sourceMainBoards = new BehaviorSubject<MainBoard[]>([]);

  mainBoards = this.sourceMainBoards.asObservable();

  constructor(private httpService: HttpService) {}

  async createNewMainBoards(mainBoard: MainBoard): Promise<void> {
    const result = this.mainBoards.pipe(map((array) => array.concat(mainBoard)));

    this.sourceMainBoards.next(await firstValueFrom(result));

    return await this.httpService.setCollection('mainBoards', mainBoard);
  }

  async getMainBoards(userAuthUid: string): Promise<void> {
    const result = this.httpService.getFromCollectionByProperty(
      'mainBoards',
      'userUid',
      userAuthUid
    );
    this.sourceMainBoards.next(await firstValueFrom(result as unknown as Observable<MainBoard[]>));
  }

  async updateMainBoardTitle(boardId: string, titleValue: string | undefined): Promise<Object> {
    const result = this.mainBoards.pipe(
      map((array) =>
        array.map(function (element) {
          if (element.id === boardId) {
            element.title = titleValue as string;
          }
          return element;
        })
      )
    );

    this.sourceMainBoards.next(await firstValueFrom(result));

    return this.httpService.updateDocumentField('mainBoards', boardId, 'title', titleValue);
  }

  async updateMainBoardDescription(
    boardId: string,
    descriptionValue: string | undefined
  ): Promise<Object> {
    const result = this.mainBoards.pipe(
      map((array) =>
        array.map(function (element) {
          if (element.id === boardId) {
            element.description = descriptionValue as string;
          }
          return element;
        })
      )
    );

    this.sourceMainBoards.next(await firstValueFrom(result));

    return this.httpService.updateDocumentField(
      'mainBoards',
      boardId,
      'description',
      descriptionValue
    );
  }

  async deleteMainBoard(idBoard: string): Promise<Object> {
    const result = this.mainBoards.pipe(
      map((array) => array.filter((element) => element.id !== idBoard))
    );

    this.sourceMainBoards.next(await firstValueFrom(result));

    return this.httpService.deleteDocument('mainBoards', idBoard);
  }

  getPushId(): string {
    return this.httpService.createId();
  }
}
