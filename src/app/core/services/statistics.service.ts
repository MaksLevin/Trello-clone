import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpService: HttpService) {}

  async getData<T>(collection: string, userAuthUid: string): Promise<T[]> {
    const data = this.httpService.getFromCollectionByProperty(collection, 'userUid', userAuthUid);

    return (await firstValueFrom(data)) as T[];
  }
}
