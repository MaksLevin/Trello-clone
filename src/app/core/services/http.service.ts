import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, firstValueFrom } from 'rxjs';

import { databasePath } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  async setCollection(collection: string, setElement: object): Promise<void> {
    await firstValueFrom(this.http.post(`${databasePath}${collection}`, setElement));
  }

  getFromCollectionByProperty<T>(
    collection: string,
    field: string,
    value: string
  ): Observable<T[]> {
    return this.http
      .get<T[]>(`${databasePath}${collection}`)
      .pipe(
        map((dataArray) =>
          dataArray.filter((dataObject: any) => dataObject[field as any] === value)
        )
      );
  }

  async updateDocumentField(
    collection: string,
    documentId: string,
    documentField: string,
    documentFieldValue: string | undefined
  ): Promise<Object> {
    return await firstValueFrom(
      this.http.patch(`${databasePath}${collection}/${documentId}`, {
        [documentField]: documentFieldValue,
      })
    );
  }

  async deleteDocument(collection: string, documentId: string): Promise<Object> {
    return await firstValueFrom(this.http.delete(`${databasePath}${collection}/` + documentId));
  }

  createId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
