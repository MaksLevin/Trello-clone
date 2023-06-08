import { Injectable } from '@angular/core';
import { HttpService } from '@app/core/services';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

import { MainBoard } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  private sourceMainBoards$ = new BehaviorSubject<MainBoard[]>([]);

  mainBoards$ = this.sourceMainBoards$.asObservable();

  constructor(private httpService: HttpService) {}

  async createNewMainBoards(mainBoard: MainBoard): Promise<void> {
    const newMainBoards = this.mainBoards$.pipe(map((array) => array.concat(mainBoard)));
    const result = await firstValueFrom(newMainBoards);

    this.sourceMainBoards$.next(result);

    await this.httpService.setCollection('mainBoards', mainBoard);
  }

  async getMainBoards(userAuthUid: string): Promise<void> {
    const mainBoards = this.httpService.getFromCollectionByProperty(
      'mainBoards',
      'userUid',
      userAuthUid
    );
    const result = await firstValueFrom(mainBoards as Observable<MainBoard[]>);

    this.sourceMainBoards$.next(result);
  }

  async updateMainBoardTitle(boardId: string, titleValue: string | undefined): Promise<void> {
    const updatedMainBoards = this.mainBoards$.pipe(
      map((mainBoards) =>
        mainBoards.map((mainBoard) => {
          if (mainBoard.id === boardId) {
            mainBoard.title = titleValue as string;
          }
          return mainBoard;
        })
      )
    );
    const result = await firstValueFrom(updatedMainBoards);

    this.sourceMainBoards$.next(result);

    this.httpService.updateDocumentField('mainBoards', boardId, 'title', titleValue);
  }

  async updateMainBoardDescription(
    boardId: string,
    descriptionValue: string | undefined
  ): Promise<void> {
    const updatedMainBoards = this.mainBoards$.pipe(
      map((mainBoards) =>
        mainBoards.map((mainBoard) => {
          if (mainBoard.id === boardId) {
            mainBoard.description = descriptionValue as string;
          }
          return mainBoard;
        })
      )
    );
    const result = await firstValueFrom(updatedMainBoards);

    this.sourceMainBoards$.next(result);

    this.httpService.updateDocumentField('mainBoards', boardId, 'description', descriptionValue);
  }

  async deleteMainBoard(idBoard: string): Promise<void> {
    const newMainBoards = this.mainBoards$.pipe(
      map((mainBoards) => mainBoards.filter((mainBoard) => mainBoard.id !== idBoard))
    );
    const result = await firstValueFrom(newMainBoards);

    this.sourceMainBoards$.next(result);

    this.httpService.deleteDocument('mainBoards', idBoard);
  }

  getPushId(): string {
    return this.httpService.createId();
  }
}
