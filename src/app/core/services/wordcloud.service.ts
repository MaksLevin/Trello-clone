import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { HttpService } from './http.service';
import { MainBoard, WordCloudData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WordCloudService {
  constructor(private httpService: HttpService) {}

  async getData<T>(collection: string, userAuthUid: string): Promise<WordCloudData[]> {
    const data = this.httpService.getFromCollectionByProperty(collection, 'userUid', userAuthUid);

    const mainBoards = (await firstValueFrom(data)) as MainBoard[];

    const wordCloudData = mainBoards.map((board: MainBoard) => {
      return { text: board.title, value: 10 + Math.random() * 90, fill: '0' };
    });

    return wordCloudData;
  }
}
